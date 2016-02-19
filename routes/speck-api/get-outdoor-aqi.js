var express = require('express');
var router = express.Router();
var esdr = require('../../lib/esdr');
var config = require('../../config');
var log = require('log4js').getLogger('specksensor:routes:speckapi:getoutdooraqi');

module.exports = function(ActiveSpeckModel, PM25StationsModel) {

   var OUTDOOR_AQI_DEFAULT_VALUE = -1;
   var SPECK_PRODUCT_ID = parseInt(config.get("product:id"));

   // re-check a feed's geolocation no more than once per hour
   var GEOLOCATION_CACHE_DURATION_SECONDS = 60 * 60; // every hour

   router.get('/', function(req, res) {

      // We've changed our minds on this API method, deciding not to actually every display the value on the Speck's
      // screen, so we'll always just return the default value so that nothing gets displayed.  However, we'll use this
      // API method to track active Specks.  We do so by kicking off a background task when the request is received, and
      // we use the given Speck serial number and feed API key to try to find active speck with this serial number and
      // API key.  If not found or if found and we haven't verified the speck's geolocation with ESDR in a while, then
      // query ESDR to get lat/long.  Then, if geolocated, find nearest PM 2.5 station and record this Speck and its
      // nearest station to ActiveSpecks

      // send the default response
      res.set('Content-Type', 'text/plain').send("get_outdoor_aqi=" + OUTDOOR_AQI_DEFAULT_VALUE + "\r\n");

      // queue up a background task to record this active Speck
      if (req.headers &&
          typeof req.headers['serialnumber'] !== 'undefined' &&
          typeof req.headers['feedapikey'] !== 'undefined') {
         setImmediate(function() {
            recordActiveSpeck(req.headers['serialnumber'], req.headers['feedapikey']);
         });
      }
   });

   var recordActiveSpeck = function(serialNumber, feedApiKey) {
      // begin by checking our database for this speck
      ActiveSpeckModel.findBySerialNumberAndApiKey(serialNumber, feedApiKey, function(err, foundSpeck) {
         if (err) {
            log.error("Failed to find speck in ActiveSpeck table: " + err);
         }
         else {
            if (isGeolocationStale(foundSpeck)) {
               getFeedFromEsdr(feedApiKey, function(err, feed) {
                  if (err) {
                     log.error("Failed to get feed from ESDR: " + err);
                  }
                  else {
                     // We found the feed, which may or may not be geolocated, so now try to do the following:
                     // * find the closest station (if any)
                     // * insert/update this feed in the ActiveSpecks table (both the geolocation and the nearest station)
                     //
                     // Note that we could check to see whether the lat/long from ESDR match what's in the foundSpeck,
                     // but since the nearest station with non-null recent data can change from hour to hour, and since
                     // the calculation isn't very expensive, just go ahead and recompute.
                     findNearestAndInsertOrUpdate(serialNumber, feedApiKey, feed);
                  }
               });
            } else {
               log.debug("Don't verify this feed's geolocation with ESDR since geolocation isn't stale.");
            }
         }
      });
   };

   var isGeolocationStale = function(activeSpeck){
      if (activeSpeck && typeof activeSpeck.geolocationVerifiedUnixTimeSecs !== 'undefined') {
         var secsSinceLastRequest = Date.now() / 1000 - activeSpeck.geolocationVerifiedUnixTimeSecs;
         return secsSinceLastRequest > GEOLOCATION_CACHE_DURATION_SECONDS;
      }

      return true;
   };

   var getFeedFromEsdr = function(feedApiKey, callback) {
      // get the feed from ESDR to verify that it's a valid Speck feed and to get the lat/long
      esdr.findFeedByIdOrApiKey(feedApiKey, ['productId', 'userId', 'latitude', 'longitude'], function(err, feed) {
         if (err || feed == null || typeof feed.data === 'undefined' || feed.data == null) {
            // if failed to get the feed from ESDR (no matter the reason, including the feed simply being unknown),
            // then just give up
            callback(new Error("Error getting feed from ESDR, or unknown feed: " + err));
         }
         else {
            // make sure it's a Speck feed
            if (feed.data.productId == SPECK_PRODUCT_ID) {
               callback(null, feed.data);
            }
            else {
               callback(new Error("Ignoring request for a feed that isn't a Speck (product ID " + feed.data.productId + ")"));
            }
         }
      });
   };

   var findNearestAndInsertOrUpdate = function(serialNumber, feedApiKey, feed){
      PM25StationsModel.findNearest(feed.latitude, feed.longitude, function(err, nearestStation) {
         if (err) {
            log.error("Failed to find nearest station for lat/long (" + feed.latitude + "," + feed.longitude + ")");
         }
         else {

            // insert/update the Speck in the ActiveSpecks table
            ActiveSpeckModel.insertOrUpdate(
                  {
                     serialNumber : serialNumber,
                     feedApiKey : feedApiKey,
                     latitude : feed.latitude,
                     longitude : feed.longitude,
                     esdrUserId : feed.userId,
                     preferences : {
                        nearestPm25Station : nearestStation ? {
                           feedId : nearestStation.feedId,
                           distanceKm : nearestStation.distance
                        } : null
                     }
                  },
                  function(err, newActiveSpeck) {
                     if (err) {
                        log.error("Failed to insert/update active speck: " + err);
                     }
                     else {
                        log.debug("Successfully inserted/updated active speck: " + JSON.stringify(newActiveSpeck, null, 3));
                     }
                  });
         }
      });
   };

   return router;
};

