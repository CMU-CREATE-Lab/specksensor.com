var JaySchema = require('jayschema');
var jsonValidator = new JaySchema();
var ValidationError = require('../lib/errors').ValidationError;
var trimAndCopyPropertyIfNonEmpty = require('../lib/objectUtils').trimAndCopyPropertyIfNonEmpty;
var copyPropertyIfDefinedAndNonNull = require('../lib/objectUtils').copyPropertyIfDefinedAndNonNull;
var log = require('log4js').getLogger('specksensor:models:activespecks');

var CREATE_TABLE_QUERY = " CREATE TABLE IF NOT EXISTS `ActiveSpecks` ( " +
                         "`id` bigint(20) NOT NULL AUTO_INCREMENT, " +
                         "`serialNumber` varchar(255) NOT NULL, " +
                         "`feedApiKey` varchar(64) NOT NULL, " +
                         "`latitude` double DEFAULT NULL, " +
                         "`longitude` double DEFAULT NULL, " +
                         "`esdrUserId` bigint(20) NOT NULL, " +
                         "`geolocationVerifiedUtcSecs` double NOT NULL, " +
                         "`preferences` text NOT NULL, " +
                         "`created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
                         "`modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, " +
                         "PRIMARY KEY (`id`), " +
                         "UNIQUE KEY `unique_serialNumber` (`serialNumber`), " +
                         "KEY `esdrUserId` (`esdrUserId`), " +
                         "KEY `geolocationVerifiedUtcSecs` (`geolocationVerifiedUtcSecs`), " +
                         "KEY `created` (`created`), " +
                         "KEY `modified` (`modified`) " +
                         ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8";

var MIN_PREFERENCES_STRING_LENGTH = 2;

var JSON_SCHEMA = {
   "$schema" : "http://json-schema.org/draft-04/schema#",
   "title" : "ActiveSpeck",
   "description" : "An active Speck",
   "type" : "object",
   "properties" : {
      // Speck serial numbers are (currently?) exactly 32 hex characters
      "serialNumber" : {
         "type" : "string",
         "pattern" : "^[a-fA-F0-9]{32}$",   // hex chars
         "minLength" : 32,
         "maxLength" : 32
      },
      // Speck feed API Keys are exactly 64 hex characters
      "feedApiKey" : {
         "type" : "string",
         "pattern" : "^[a-fA-F0-9]{64}$",   // hex chars
         "minLength" : 64,
         "maxLength" : 64
      },
      "latitude" : {
         "type" : "number",
         "minimum" : -90,
         "maximum" : 90
      },
      "longitude" : {
         "type" : "number",
         "minimum" : -180,
         "maximum" : 180
      },
      "esdrUserId" : {
         "type" : "number",
         "minimum" : 1
      },
      "preferences" : {
         "type" : "string",
         "minLength" : MIN_PREFERENCES_STRING_LENGTH
      }
   },
   "required" : ["serialNumber", "feedApiKey", "esdrUserId", "preferences"]
};

module.exports = function(databaseHelper) {

   this.initialize = function(callback) {
      databaseHelper.execute(CREATE_TABLE_QUERY, [], function(err) {
         if (err) {
            log.error("Error trying to create the ActiveSpecks table: " + err);
            return callback(err);
         }

         return callback(null, true);
      });
   };

   this.insertOrUpdate = function(speckDetails, callback) {
      // first build a copy and trim some fields
      var speck = {
         geolocationVerifiedUtcSecs : Date.now() / 1000
      };
      trimAndCopyPropertyIfNonEmpty(speckDetails, speck, 'serialNumber');
      trimAndCopyPropertyIfNonEmpty(speckDetails, speck, 'feedApiKey');
      copyPropertyIfDefinedAndNonNull(speckDetails, speck, 'latitude');
      copyPropertyIfDefinedAndNonNull(speckDetails, speck, 'longitude');
      copyPropertyIfDefinedAndNonNull(speckDetails, speck, 'esdrUserId');
      if (typeof speckDetails.preferences !== 'undefined' && speckDetails.preferences != null) {
         speck.preferences = JSON.stringify(speckDetails.preferences);
      }

      // now validate
      jsonValidator.validate(speck, JSON_SCHEMA, function(err) {
         if (err) {
            log.error(err);
            return callback(new ValidationError(err));
         }

         // must be valid, so try to insert
         databaseHelper.execute("INSERT INTO ActiveSpecks SET ? " +
                                "ON DUPLICATE KEY UPDATE " +
                                "   feedApiKey=VALUES(feedApiKey), " +
                                "   latitude=VALUES(latitude), " +
                                "   longitude=VALUES(longitude), " +
                                "   esdrUserId=VALUES(esdrUserId), " +
                                "   geolocationVerifiedUtcSecs=VALUES(geolocationVerifiedUtcSecs), " +
                                "   preferences=VALUES(preferences) ",
                                speck,
                                function(err, result) {
                                   if (err) {
                                      return callback(err);
                                   }

                                   return callback(null, {
                                      id : result.insertId,
                                      serialNumber : speck.serialNumber,
                                      feedApiKey : speck.feedApiKey
                                   });
                                });
      });
   };

   /**
    * Tries to find the record with the given <code>id</code> and returns it to the given <code>callback</code>. If
    * successful, the active speck is returned as the 2nd argument to the <code>callback</code> function.  If
    * unsuccessful, <code>null</code> is returned to the callback.
    *
    * @param {int} id ID of the active speck record to find.
    * @param {function} callback function with signature <code>callback(err, activeSpeck)</code>
    */
   this.findById = function(id, callback) {
      findOne("SELECT * FROM ActiveSpecks WHERE id=?", [id], callback);
   };

   /**
    * Tries to find the record with the given <code>serialNumber</code> and returns it to the given
    * <code>callback</code>. If successful, the active speck is returned as the 2nd argument to the
    * <code>callback</code> function.  If unsuccessful, <code>null</code> is returned to the callback.
    *
    * @param {string} serialNumber serial number of the active speck record to find.
    * @param {function} callback function with signature <code>callback(err, activeSpeck)</code>
    */
   this.findBySerialNumber = function(serialNumber, callback) {
      findOne("SELECT * FROM ActiveSpecks WHERE serialNumber=?", [serialNumber], callback);
   };

   /**
    * Tries to find the record with the given <code>serialNumber</code> and <code>feedApiKey</code> and returns it to
    * the given <code>callback</code>. If successful, the active speck is returned as the 2nd argument to the
    * <code>callback</code> function.  If unsuccessful, <code>null</code> is returned to the callback.
    *
    * @param {string} serialNumber serial number of the active speck record to find.
    * @param {string} feedApiKey feed API key of the active speck record to find.
    * @param {function} callback function with signature <code>callback(err, activeSpeck)</code>
    */
   this.findBySerialNumberAndApiKey = function(serialNumber, feedApiKey, callback) {
      findOne("SELECT * FROM ActiveSpecks WHERE serialNumber=? AND feedApiKey=?", [serialNumber, feedApiKey], callback);
   };

   var findOne = function(query, params, callback) {
      databaseHelper.findOne(query, params, function(err, user) {
         if (err) {
            log.error("Error trying to find active speck: " + err);
            return callback(err);
         }

         return callback(null, user);
      });
   };

};
