var express = require('express');
var router = express.Router();
var passport = require('passport');
var httpStatus = require('http-status');
var log = require('log4js').getLogger('specksensor:routes:api:pm-stations');

module.exports = function(PM25StationsModel) {

   // Find stations
   router.get('/',
              function(req, res, next) {

                 PM25StationsModel.find(req.query, function(err, result) {
                    if (err) {
                       log.error(JSON.stringify(err, null, 3));
                       // See if the error contains a JSend data object.  If so, pass it on through.
                       if (typeof err.data !== 'undefined' &&
                           typeof err.data.code !== 'undefined' &&
                           typeof err.data.status !== 'undefined') {
                          return res.jsendPassThrough(err.data);
                       }
                       return res.jsendServerError("Failed to get stations", null);
                    }

                    return res.jsendSuccess(result);
                 });
              });

   // Returns info about the specified station
   router.get('/:feedId',
              function(req, res, next) {
                 var feedId = req.params.feedId;
                 log.debug("Received GET for PM Station with feed ID [" + feedId + "]");

                 PM25StationsModel.findByFeedId(feedId, req.query.fields, function(err1, station) {
                    if (err1) {
                       var message = "Error while trying to find station with feed ID [" + feedId + "]";
                       log.error(message + ": " + err1);
                       return res.jsendServerError(message);
                    }

                    // call the successCallback if we found the station, otherwise return a 404
                    if (station) {
                       return res.jsendSuccess(station); // HTTP 200 OK
                    }
                    else {
                       return res.jsendClientError("Unknown or invalid station " + feedId, null, httpStatus.NOT_FOUND); // HTTP 404 Not Found
                    }
                 });
              }
   );

   return router;

};
