var flow = require('nimble');
var superagent = require('superagent');
var httpStatus = require('http-status');
var fs = require('fs');
var path = require('path');
var requireNew = require('require-new');
var config = require('../config');
var log = require('log4js').getLogger('specksensor:lib:outdoorairqualitycache');

// hardcode this to production because dev/test/stage don't have the multifeed or data we need
var ESDR_MULTIFEED_ROOT_URL = "http://esdr.cmucreatelab.org/api/v1/multifeeds/pm_25";
var ESDR_QUERY_ITEM_LIMIT = 1000;

var TIMER_INTERVAL_IN_MILLIS = 20 * 60 * 1000;     // 20 minutes
var FOUR_HOURS_IN_SECONDS = 4 * 60 * 60;           // 4 hours

// stuff for tile fetching
var TILE_BIN_DURATION = FOUR_HOURS_IN_SECONDS / 512;
var TILE_LEVEL = Math.floor(Math.log2(TILE_BIN_DURATION));
var TILE_DURATION = 512 * Math.pow(2, TILE_LEVEL);
var NUM_TILES_TO_REQUEST = Math.ceil(FOUR_HOURS_IN_SECONDS / TILE_DURATION);

var FEED_PREFIX = 'feed_';
var FEED_PREFIX_LENGTH = FEED_PREFIX.length;

var DATA_FILE = path.join(config.get('dataGenDirectory'), "outdoor_pm25.json");

var govtFeeds = [];
var recentDataByFeedId = null;

var loadGovtFeeds = function(page, done) {
   var offset = ESDR_QUERY_ITEM_LIMIT * page;

   superagent
         .get(ESDR_MULTIFEED_ROOT_URL + "/feeds?fields=id,latitude,longitude&orderBy=id&limit=" + ESDR_QUERY_ITEM_LIMIT + "&offset=" + offset)
         .end(function(err, res) {
            if (err) {
               // TODO:
               done(err);
            }
            else {
               // got the data
               if (res.body.code == 200 && typeof res.body.data !== 'undefined' && res.body.data != null) {

                  // concatenate the new rows
                  Array.prototype.push.apply(govtFeeds, res.body.data.rows);

                  // see whether we need to load more
                  if (govtFeeds.length < res.body.data.totalCount) {
                     loadGovtFeeds(++page, done);
                  }
                  else {
                     done();
                  }
               }
               else {
                  // TODO:
                  done(new Error("Failed to load govt feeds: " + JSON.stringify(res.body, null, 3)));
               }
            }
         });
};

// Makes a tile request to the PM2.5 multifeed, to get data for all feeds within the last 4 hours.
var loadRecentData = function(sinceTimestampSecs, loadDone) {
   // compute the tile offset, based on the starting time
   var tileOffset = Math.floor(sinceTimestampSecs / TILE_DURATION);

   var tileRequests = [];
   var tiles = [];

   // create the necessary tile requests so that we can fully span the desired duration with tiles
   var createTileRequest = function(offset) {
      return function(done) {
         var url = ESDR_MULTIFEED_ROOT_URL + "/tiles/" + TILE_LEVEL + "." + offset;
         superagent
               .get(url)
               .end(function(err, res) {
                  if (err) {
                     // TODO:
                     done(err);
                  }
                  else {
                     // got the data
                     if (res.statusCode == httpStatus.OK &&
                         typeof res.body.data !== 'undefined'               &&
                         res.body.data != null                              &&
                         typeof res.body.full_channel_names !== 'undefined' &&
                         res.body.full_channel_names != null) {

                        tiles.push(res.body);
                        done();
                     }
                     else {
                        // TODO:
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
                       log.error("Failed to load tiles: " + errors);
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
                             //var channelName = fullChannelNameParts[2];
                             var feedId = parseInt(feedStr.slice(FEED_PREFIX_LENGTH));

                             // now try to find the most recent data for this feed--search backwards through the data
                             // array, quitting early if we find a non-null value
                             for (var i = data.length - 1; i >= 0; i--) {
                                // need to add 1 to the index to account for the timestamp in position 0
                                var timeUtcSecs = data[i][0];
                                var value = data[i][index + 1];
                                if (value != null) {
                                   recentDataByFeedId[feedId] = {
                                      value : value,
                                      //channel: channelName,
                                      timeUtcSecs : timeUtcSecs
                                   };
                                   break;
                                }
                             }
                          }
                       });
                    }

                    loadDone();
                 });
};

module.exports = function() {

   var refreshCache = function() {
      log.debug("Refreshing cache file");

      // compute
      var sinceTimestampSecs = Math.round(Date.now() / 1000) - FOUR_HOURS_IN_SECONDS;

      // reset collections
      govtFeeds = [];
      recentDataByFeedId = null;

      flow.parallel([
                       function(done) {
                          loadGovtFeeds(0, done);
                       },
                       function(done) {
                          loadRecentData(sinceTimestampSecs, done);
                       }
                    ],
                    function(errors) {
                       if (errors) {
                          log.error("Failed to refresh cache: " + errors);
                       }
                       else {

                          // now merge the feed metadata with the most recent value, keeping only those feeds which
                          // have data within the desired time range
                          var data = [];
                          govtFeeds.forEach(function(feed) {
                             if (feed.id in recentDataByFeedId) {
                                feed.mostRecent = recentDataByFeedId[feed.id];
                                data.push(feed);
                             }
                          });

                          // write the data to a file (TODO: write to temp file, then move into place)
                          fs.writeFile(DATA_FILE, JSON.stringify(data, null, 3), function(err) {
                             // TODO:
                             if (err) {
                                log.error("Failed to write cache: " + err);
                             }
                             else {
                                log.debug("Successfully wrote cache");
                             }
                          });
                       }
                    });
   };

   this.initialize = function() {
      log.info("data file: " + DATA_FILE);

      setImmediate(function() {
         // Set up a timer to refresh the cache of government air quality stations
         setInterval(refreshCache, TIMER_INTERVAL_IN_MILLIS);

         // go ahead and refresh the cache now, too, so we have it ready to go on server startup
         refreshCache();
      });
   };

   this.getData = function() {
      // read with requireNew so we're sure to get the latest data file
      return requireNew(DATA_FILE);
   };
};