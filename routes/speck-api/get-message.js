var express = require('express');
var router = express.Router();
var config = require('../../config');
var log = require('log4js').getLogger('specksensor:routes:speckapi:getmessage');

module.exports = function(ActiveSpeckModel, PM25StationsModel) {
   var DEFAULT_MESSAGE = config.get("firmware:message");

   var SERIAL_NUMBER_WHITELIST = [
      '899c96b14ac4e4b1ab92d9cd9985595a'
   ];

   router.get('/', function(req, res) {

      if (req.headers && req.headers['serialnumber']) {
         var serialNumber = req.headers['serialnumber'];
         if (SERIAL_NUMBER_WHITELIST.indexOf(serialNumber) >= 0) {
            return ActiveSpeckModel.findMostRecentBySerialNumber(serialNumber, function(err, speck) {
               if (err) {
                  log.error("Failed to find speck by serial number: " + err);
                  sendResponse(res);
               }
               else {
                  if (speck && speck.preferences) {
                     try {
                        var preferences = JSON.parse(speck.preferences);
                        if (preferences.nearestPm25Station && typeof preferences.nearestPm25Station.feedId !== 'undefined') {
                           var stationFeedId = preferences.nearestPm25Station.feedId;

                           // now find the corresponding PM25Station
                           return PM25StationsModel.findByFeedId(stationFeedId, function(err, station) {
                              if (err) {
                                 log.error("Failed to find the PM25Station with feedId [" + stationFeedId + "]");
                                 sendResponse(res);
                              }
                              else {
                                 if (station && station.recentValue != null) {
                                    sendResponse(res, getMessageForPM25Value(station.recentValue));
                                 }
                                 else {
                                    sendResponse(res);
                                 }
                              }
                           });
                        }
                     }
                     catch (e) {
                        log.error("Failed to parse preferences as JSON for Speck with serial number [" + serialNumber + "]");
                     }
                  }

                  sendResponse(res);
               }
            });
         }
      }

      sendResponse(res);
   });

   // See:
   // * http://airnow.gov/index.cfm?action=aqibasics.aqi
   // * http://airnow.gov/index.cfm?action=resources.aqi_conc_calc
   var getMessageForPM25Value = function(value) {
      var message = null;
      if (value <= 12) {
         message = "    Outdoor: Good    ";
      }
      else if (value <= 35.4) {
         message = "  Outdoor: Moderate  ";
      }
      else if (value <= 55.4) {
         message = "Outdoor: Unhealthy for Sen Grps";
      }
      else if (value <= 150.4) {
         message = "  Outdoor: Unhealthy  ";
      }
      else if (value <= 250.4) {
         message = "Outdoor: Very Unhealthy";
      }
      else {
         message = "Outdoor: Hazardous";
      }

      return message;
   };

   var sendResponse = function(res, message) {
      message = message || DEFAULT_MESSAGE;
      res.set('Content-Type', 'text/plain').send("get_message=" + message + "\r\n");
   };

   return router;
};

