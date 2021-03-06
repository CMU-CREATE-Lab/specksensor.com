var flow = require('nimble');
var superagent = require('superagent');
var httpStatus = require('http-status');
var JaySchema = require('jayschema');
var jsonValidator = new JaySchema();
var ValidationError = require('../lib/errors').ValidationError;
var Query2Query = require('query2query');
var config = require('../config');
var log = require('log4js').getLogger('specksensor:models:pm25stations');

var CREATE_TABLE_QUERY = " CREATE TABLE IF NOT EXISTS `PM25Stations` ( " +
                         "`id` bigint(20) NOT NULL AUTO_INCREMENT, " +
                         "`feedId` bigint(20) NOT NULL, " +
                         "`latitude` double NOT NULL, " +
                         "`longitude` double NOT NULL, " +
                         "`recentValue` double DEFAULT NULL, " +
                         "`recentValueUnixTimeSecs` double DEFAULT NULL, " +
                         "`channelName` varchar(255) DEFAULT NULL, " +
                         "`created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
                         "`modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, " +
                         "PRIMARY KEY (`id`), " +
                         "UNIQUE KEY `unique_feedId` (`feedId`), " +
                         "KEY `latitude` (`latitude`), " +
                         "KEY `longitude` (`longitude`), " +
                         "KEY `recentValue` (`recentValue`), " +
                         "KEY `recentValueUnixTimeSecs` (`recentValueUnixTimeSecs`), " +
                         "KEY `channelName` (`channelName`), " +
                         "KEY `created` (`created`), " +
                         "KEY `modified` (`modified`) " +
                         ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8";

var MAX_FOUND_STATIONS = 1000;

var query2query = new Query2Query();
query2query.addField('feedId', true, true, false, Query2Query.types.INTEGER);
query2query.addField('latitude', true, true, false, Query2Query.types.NUMBER);
query2query.addField('longitude', true, true, false, Query2Query.types.NUMBER);
query2query.addField('recentValue', true, true, true, Query2Query.types.NUMBER);
query2query.addField('recentValueUnixTimeSecs', true, true, true, Query2Query.types.NUMBER);
query2query.addField('channelName', true, true, true);
query2query.addField('created', true, true, false, Query2Query.types.DATETIME);
query2query.addField('modified', true, true, false, Query2Query.types.DATETIME);

var JSON_SCHEMA = {
   "$schema" : "http://json-schema.org/draft-04/schema#",
   "title" : "PM25Station",
   "description" : "A PM 2.5 Station",
   "type" : "object",
   "properties" : {
      "feedId" : {
         "type" : "number",
         "minimum" : 1
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
      "recentValue" : {
         "type" : "number"
      },
      "recentValueUnixTimeSecs" : {
         "type" : "number"
      },
      "channelName" : {
         "type" : "string",
         "minLength" : 1,
         "maxLength" : 255
      }
   },
   "required" : ["feedId", "latitude", "longitude"]
};

// hardcode this to production because dev/test/stage don't have the multifeed or data we need
var ESDR_MULTIFEED_ROOT_URL = "http://esdr.cmucreatelab.org/api/v1/multifeeds/pm_2_5";
var ESDR_QUERY_ITEM_LIMIT = 1000;

var REFRESH_INTERVAL_MILLIS = config.get("pm25Stations:refreshIntervalMillis");
var FOUR_HOURS_IN_SECONDS = 4 * 60 * 60;           // 4 hours

// stuff for tile fetching
var TILE_BIN_DURATION = FOUR_HOURS_IN_SECONDS / 512;
var TILE_LEVEL = Math.floor(Math.log2(TILE_BIN_DURATION));
var TILE_DURATION = 512 * Math.pow(2, TILE_LEVEL);
var NUM_TILES_TO_REQUEST = Math.ceil(FOUR_HOURS_IN_SECONDS / TILE_DURATION);

var FEED_PREFIX = 'feed_';
var FEED_PREFIX_LENGTH = FEED_PREFIX.length;

var SEARCH_RADIUS_IN_KM = 40;
var ONE_DEGREE_OF_LATITUDE_IN_KM = 111.045;

module.exports = function(databaseHelper) {

   this.initialize = function(callback) {
      databaseHelper.execute(CREATE_TABLE_QUERY, [], function(err) {
         if (err) {
            log.error("Error trying to create the PM25Stations table: " + err);
            return callback(err);
         }

         setImmediate(function() {
            // Set up a timer to refresh the cache of government air quality stations
            log.info("Will refresh cache every [" + (REFRESH_INTERVAL_MILLIS / (1000 * 60)) + "] minutes");
            setInterval(refreshCache, REFRESH_INTERVAL_MILLIS);

            // go ahead and refresh the data now, too, so we have it ready to go on server startup
            refreshCache();
         });

         return callback(null, true);
      });
   };

   /**
    * Tries to find the nearest station with data within <code>SEARCH_RADIUS_IN_KM</code> kilometers of the given
    * <code>latitude</code> and <code>longitude</code>.  Returns <code>null</code> if the given <code>latitude</code> or
    * <code>longitude</code> is <code>null</code>.
    *
    * @param {Number} latitude The latitude of the location. If <code>null</code>, a <code>null</code> location is returned.
    * @param {Number} longitude The longitude of the location. If <code>null</code>, a <code>null</code> location is returned.
    * @param {function} callback
    */
   this.findNearest = function(latitude, longitude, callback) {
      if (latitude == null || longitude == null) {
         setImmediate(function() {
            callback(null, null);
         });
      }
      else {
         // this SQL badassery is from http://www.plumislandmedia.net/mysql/haversine-mysql-nearest-loc/
         findOne(
               "SELECT id, feedId, latitude, longitude, recentValue, recentValueUnixTimeSecs, distance FROM ( " +
               "   SELECT " +
               "      s.id, " +
               "      s.feedId, " +
               "      s.latitude, " +
               "      s.longitude, " +
               "      s.recentValue, " +
               "      s.recentValueUnixTimeSecs, " +
               "      p.radius, " +
               "      p.distanceUnit * DEGREES(ACOS(COS(RADIANS(p.latitude)) " +
               "                 * COS(RADIANS(s.latitude)) " +
               "                 * COS(RADIANS(p.longitude - s.longitude)) " +
               "                 + SIN(RADIANS(p.latitude)) " +
               "                 * SIN(RADIANS(s.latitude)))) AS distance " +
               "   FROM PM25Stations AS s " +
               "   JOIN ( " +
               "         SELECT " +
               "            ? AS latitude, " +
               "            ? AS longitude, " +
               "            ? AS radius, " +
               "            ? AS distanceUnit " +
               "         ) AS p ON 1=1 " +
               "   WHERE " +
               "      recentValue IS NOT NULL " +
               "      AND " +
               "      s.latitude " +
               "         BETWEEN " +
               "            p.latitude  - (p.radius / p.distanceUnit) AND " +
               "            p.latitude  + (p.radius / p.distanceUnit) " +
               "      AND " +
               "      s.longitude " +
               "         BETWEEN " +
               "            p.longitude - (p.radius / (p.distanceUnit * COS(RADIANS(p.latitude)))) AND " +
               "            p.longitude + (p.radius / (p.distanceUnit * COS(RADIANS(p.latitude)))) " +
               ") AS d " +
               "WHERE distance <= radius " +
               "ORDER BY distance " +
               "LIMIT 1; ",
               [latitude, longitude, SEARCH_RADIUS_IN_KM, ONE_DEGREE_OF_LATITUDE_IN_KM],
               callback);
      }
   };

   /**
    * Tries to find the station with the given <code>feedId</code> and returns it to the given <code>callback</code>. If
    * successful, the station is returned as the 2nd argument to the <code>callback</code> function.  If unsuccessful,
    * <code>null</code> is returned to the callback.
    *
    * @param {string} feedId ID of the station to find.
    * @param {string|Array} fieldsToSelect comma-delimited string or array of strings of field names to select. An empty
    * string, an empty array, or <code>null</code> will cause all fields to be selected
    * @param {function} callback function with signature <code>callback(err, station)</code>
    */
   this.findByFeedId = function(feedId, fieldsToSelect, callback) {
      if (fieldsToSelect == null) {
         fieldsToSelect = [];
      }
      
      findStation(fieldsToSelect, 'feedId', feedId, callback);
   };

   var findStation = function(fieldsToSelect, whereField, whereValue, callback) {
      query2query.parse({fields : fieldsToSelect}, function(err, queryParts) {
         if (err) {
            return callback(err);
         }

         var sql = queryParts.selectClause + " FROM PM25Stations WHERE " + whereField + "=?";
         databaseHelper.findOne(sql, [whereValue], function(err, station) {
            if (err) {
               log.error("Error trying to find PM25Station with " + whereField + " [" + whereValue + "]: " + err);
               return callback(err);
            }

            return callback(null, station);
         });
      });
   };

   this.find = function(queryString, callback) {
      query2query.parse(queryString, function(err, queryParts) {

                           if (err) {
                              return callback(err);
                           }

                           var sql = queryParts.sql("PM25Stations");
                           log.debug("PM25Stations.find(): " + sql + (queryParts.whereValues.length > 0 ? " [where values: " + queryParts.whereValues + "]" : ""));

                           // use findWithLimit so we can also get a count of the total number of records that would have been returned
                           // had there been no LIMIT clause included in the query
                           databaseHelper.findWithLimit(sql, queryParts.whereValues, function(err, result) {
                              if (err) {
                                 return callback(err);
                              }

                              // copy in the offset and limit
                              result.offset = queryParts.offset;
                              result.limit = queryParts.limit;

                              return callback(null, result, queryParts.selectFields);
                           });
                        },
                        MAX_FOUND_STATIONS);
   };

   var refreshCache = function() {
      log.debug("Refreshing database cache of PM 2.5 Stations...");

      // compute
      var sinceTimestampSecs = Math.round(Date.now() / 1000) - FOUR_HOURS_IN_SECONDS;

      // initialize collections
      var govtFeeds = null;
      var recentDataByFeedId = null;

      flow.parallel([
                       function(done) {
                          loadGovtFeeds(0, null, function(err, data) {
                             if (err) {
                                return done(new Error("Error loading govt feeds: " + err));
                             }

                             govtFeeds = data;
                             done();
                          });
                       },
                       function(done) {
                          loadRecentData(sinceTimestampSecs, function(err, data) {
                             if (err) {
                                return done(new Error("Error loading recent data: " + err));
                             }

                             recentDataByFeedId = data;
                             done();
                          });
                       }
                    ],
                    function(errors) {
                       if (errors || govtFeeds == null || recentDataByFeedId == null) {
                          log.error("Failed to refresh cache: " + errors);
                       }
                       else {

                          // now merge the govt feed metadata with the most recent value and create the database
                          // operations for inserting/updating
                          var databaseOperations = [];
                          var hasDataCount = 0;
                          govtFeeds.forEach(function(feed) {
                             if (feed.id in recentDataByFeedId) {
                                hasDataCount++;
                             }
                             databaseOperations.push(createInsertOrUpdateOperation(feed, recentDataByFeedId[feed.id]));
                          });

                          // Now we'll insert/update the stations

                          flow.series(databaseOperations, function(errors) {
                             if (errors) {
                                log.error("Error(s) writing the stations to the database: " + errors);
                             }
                             else {
                                log.debug("Successfully inserted/updated PM 2.5 stations in the database (" + govtFeeds.length + " total, " + hasDataCount + " with non-null data).");
                             }
                          });
                       }
                    });
   };

   var createInsertOrUpdateOperation = function(feed, timestampedValue) {
      timestampedValue = timestampedValue || {};

      return function(done) {
         var station = {
            feedId : feed.id,
            latitude : feed.latitude,
            longitude : feed.longitude
         };
         if (typeof timestampedValue.value !== 'undefined' && timestampedValue.value != null) {
            station.recentValue = timestampedValue.value;
            station.recentValueUnixTimeSecs = timestampedValue.unixTimeSecs;
            station.channelName = timestampedValue.channelName;
         }

         // now validate
         jsonValidator.validate(station, JSON_SCHEMA, function(err) {
            if (err) {
               log.error(err);
               return done(new ValidationError(err));
            }

            // must be valid, so try to insert or update
            databaseHelper.execute("INSERT INTO PM25Stations SET ? ON DUPLICATE KEY UPDATE " +
                                   "latitude=VALUES(latitude), " +
                                   "longitude=VALUES(longitude), " +
                                   "recentValue=VALUES(recentValue), " +
                                   "recentValueUnixTimeSecs=VALUES(recentValueUnixTimeSecs), " +
                                   "channelName=VALUES(channelName) ",
                                   station,
                                   function(err, result) {
                                      if (err) {
                                         return done(err);
                                      }

                                      done(null, result);
                                   });
         });

      };
   };

   var loadGovtFeeds = function(page, loadedFeeds, callback) {
      loadedFeeds = loadedFeeds || [];
      var offset = ESDR_QUERY_ITEM_LIMIT * page;

      superagent
            .get(ESDR_MULTIFEED_ROOT_URL + "/feeds?fields=id,latitude,longitude&orderBy=id&limit=" + ESDR_QUERY_ITEM_LIMIT + "&offset=" + offset)
            .end(function(err, res) {
               if (err) {
                  callback(err);
               }
               else {
                  // got the data
                  if (res.body.code == 200 && typeof res.body.data !== 'undefined' && res.body.data != null) {

                     // concatenate the new rows
                     Array.prototype.push.apply(loadedFeeds, res.body.data.rows);

                     // see whether we need to load more
                     if (loadedFeeds.length < res.body.data.totalCount) {
                        loadGovtFeeds(++page, loadedFeeds, callback);
                     }
                     else {
                        callback(null, loadedFeeds);
                     }
                  }
                  else {
                     callback(new Error("Failed to load govt feeds: " + JSON.stringify(res.body, null, 3)));
                  }
               }
            });
   };

   // Makes a tile request to the PM2.5 multifeed, to get data for all feeds within the last 4 hours. Data is returned
   // as a hash keyed on feed ID.
   var loadRecentData = function(sinceTimestampSecs, callback) {
      // compute the tile offset, based on the starting time
      var tileOffset = Math.floor(sinceTimestampSecs / TILE_DURATION);

      var tileRequests = [];
      var tiles = [];

      var recentDataByFeedId = {};

      // create the necessary tile requests so that we can fully span the desired duration with tiles
      var createTileRequest = function(offset) {
         return function(done) {
            var url = ESDR_MULTIFEED_ROOT_URL + "/tiles/" + TILE_LEVEL + "." + offset;
            superagent
                  .get(url)
                  .end(function(err, res) {
                     if (err) {
                        done(err);
                     }
                     else {
                        // got the data
                        if (res.statusCode == httpStatus.OK &&
                            typeof res.body.data !== 'undefined' &&
                            res.body.data != null &&
                            typeof res.body.full_channel_names !== 'undefined' &&
                            res.body.full_channel_names != null) {

                           tiles.push(res.body);
                           done();
                        }
                        else {
                           done(new Error("Failed to load data for tile " + TILE_LEVEL + "." + offset + ": " + JSON.stringify(res.body, null, 3)));
                        }
                     }
                  });
         };
      };
      for (var i = 0; i < NUM_TILES_TO_REQUEST; i++) {
         tileRequests.push(createTileRequest(tileOffset + i));
      }

      flow.parallel(tileRequests,
                    function(errors) {
                       if (errors) {
                          callback(new Error("Failed to load tiles: " + errors));
                       }
                       else {
                          // concatenate data arrays from the tiles into one
                          var data = [];
                          tiles.forEach(function(tile) {
                             data = data.concat(tile.data);
                          });

                          // Sort the new data array by the timestamps of each record.  The timestamp is in the first
                          // element of each array
                          data.sort(function(data1, data2) {
                             return data1[0] - data2[0];
                          });

                          // Iterate over the full channel names, picking out feed IDs, and computing the most recent
                          // value, if any, for that feed/channel.  We then store the recent data info in a hash keyed
                          // on feed ID
                          var fullChannelNames = tiles[0].full_channel_names;
                          recentDataByFeedId = {};
                          fullChannelNames.forEach(function(fullChannelName, index) {
                             var fullChannelNameParts = fullChannelName.split('.');
                             if (fullChannelNameParts.length >= 3) {
                                var feedStr = fullChannelNameParts[1];
                                var channelName = fullChannelNameParts[2];
                                var feedId = parseInt(feedStr.slice(FEED_PREFIX_LENGTH));

                                // set a flag for whether we already have recorded PM 2.5 data for this feed because it
                                // happens to have multiple PM 2.5 channels (e.g. feeds 26 and 29)
                                var alreadyHasPm25DataForFeed = (feedId in recentDataByFeedId);

                                // now try to find the most recent data for this feed--search backwards through the data
                                // array, quitting early if we find a non-null value
                                for (var i = data.length - 1; i >= 0; i--) {
                                   // need to add 1 to the index to account for the timestamp in position 0
                                   var value = data[i][index + 1];
                                   if (value != null) {
                                      var unixTimeSecs = data[i][0];

                                      // only record this if we haven't already recorded data for this feed, OR it's
                                      // newer than what we have
                                      if (!alreadyHasPm25DataForFeed || unixTimeSecs > recentDataByFeedId[feedId].unixTimeSecs) {
                                         recentDataByFeedId[feedId] = {
                                            value : value,
                                            channelName : channelName,
                                            unixTimeSecs : unixTimeSecs
                                         };
                                      }
                                      break;
                                   }
                                }
                             }
                          });

                          callback(null, recentDataByFeedId);
                       }

                    });
   };

   var findOne = function(query, params, callback) {
      databaseHelper.findOne(query, params, function(err, user) {
         if (err) {
            log.error("Error trying to find PM 2.5 station: " + err);
            return callback(err);
         }

         return callback(null, user);
      });
   };

};
