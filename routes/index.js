var express = require('express');
var router = express.Router();
var config = require('../config');
var superagent = require('superagent');
var log = require('log4js').getLogger('specksensor:routes:index');

//======================================================================================================================

router.get('/', function(req, res) {
   res.render('index', {
      section : "home",
      hero_image : { filename : "white_speck_hero.jpg", css_class : "anchor_right" },
      hero_text : {
         css_class : "home_hero_text",
         text : '<span class="intro">Meet Speck.</span><br>The indoor air&nbsp;quality&nbsp;monitor<br>empowering you to breathe&nbsp;easier.'
      }
   });
});

//======================================================================================================================
// LEARN
//----------------------------------------------------------------------------------------------------------------------

router.get('/learn/air-quality', function(req, res) {
   res.render('learn/air-quality', {
      title : "Learn: Air Quality",
      parent_section : "learn",
      section : "air-quality",
      hero_image : { filename : "white_speck_with_air_plant_hero_2.jpg", css_class : "anchor_left" }
   });
});

router.get('/learn/particles', function(req, res) {
   res.render('learn/particles', {
      title : "Learn: Fine Particles",
      parent_section : "learn",
      section : "particles",
      hero_image : { filename : "white_speck_with_bamboo_pot_hero.jpg", css_class : "anchor_left" }
   });
});

router.get('/learn/empowerment', function(req, res) {
   res.render('learn/empowerment', {
      title : "Learn: Speck and Empowerment",
      parent_section : "learn",
      section : "empowerment",
      hero_image : { filename : "white_speck_with_colorful_pot_hero.jpg", css_class : "anchor_right" }
   });
});

//======================================================================================================================
// SETUP & SUPPORT
//----------------------------------------------------------------------------------------------------------------------

router.get('/support/getting-started', function(req, res) {
   res.render('support/getting-started', {
      title : "Support: Getting Started",
      parent_section : "support",
      section : "getting-started"
   });
});

router.get('/support/software', function(req, res) {
   res.render('support/software', {
      title : "Support: Software",
      parent_section : "support",
      section : "software"
   });
});

router.get('/support/legacy-software', function(req, res) {
   res.render('support/legacy-software', {
      title : "Support: Legacy Software",
      parent_section : "support",
      section : "software"
   });
});

router.get('/support/tech-specs', function(req, res) {
   res.render('support/tech-specs', {
      title : "Support: Technical Specifications",
      parent_section : "support",
      section : "tech-specs"
   });
});

router.get('/support/faq', function(req, res) {
   res.render('support/faq', {
      title : "Support: FAQs",
      parent_section : "support",
      section : "faq"
   });
});

router.get('/support/contact-us', function(req, res) {
   res.render('support/contact-us', {
      title : "Support: Contact Us",
      parent_section : "support",
      section : "contact-us"
   });
});

//======================================================================================================================
// HEADER LINKS
//----------------------------------------------------------------------------------------------------------------------

router.get('/public-data', function(req, res) {
   res.render('public-data', {
      title : "Public Data",
      section : "public-data",
      googleMapsApiKey : config.get("maps:apiKey"),
      speckProductId : config.get("product:id")
   });
});

router.get('/signup', function(req, res) {
   res.render('signup', { title : "Sign Up", section : "login" });
});

router.get('/air-quality-by-zip-code', function(req, res) {
   res.render('air-quality-by-zip-code', {
      title : "Air Quality Zip Code Search",
      section : "air-quality-by-zip-code"
   });
});

//======================================================================================================================
// FOOTER LINKS
//----------------------------------------------------------------------------------------------------------------------

router.get('/about-us', function(req, res) {
   res.render('about-us', { title : "About Us", section : "about-us" });
});

router.get('/press', function(req, res) {
   res.render('press', { title : "Press", section : "press" });
});

router.get('/jobs', function(req, res) {
   res.render('jobs', { title : "Jobs", section : "jobs" });
});

router.get('/policies-and-terms', function(req, res) {
   res.render('policies-and-terms', {
      title : "Policies and Terms",
      section : "policies-and-terms"
   });
});

//======================================================================================================================
// USER VERIFICATION
//----------------------------------------------------------------------------------------------------------------------

router.get('/verification/:verificationToken', function(req, res) {
   // since we'll be injecting the verification token into JavaScript,
   // be paranoid and remove anything that's not a valid hex character
   var cleanedVerificationToken = (req.params.verificationToken) ? req.params.verificationToken.replace(/([^a-f0-9]+)/gi, '') : "";
   res.render('verification', { title : "Verify Your Account", verificationToken : cleanedVerificationToken });
});

router.get('/verification', function(req, res) {
   res.render('verification', { title : "Resend Account Verification Email" });
});

//======================================================================================================================
// SPECK API
//----------------------------------------------------------------------------------------------------------------------

router.get('/get_time/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_time=" + parseInt(Date.now() / 1000) + "\r\n");
});

var OUTDOOR_AQI_DEFAULT_VALUE = -1;
var OUTDOOR_AQI_DEFAULT_CHANNEL_NAME = "PM2_5";
var OUTDOOR_AQI_MAX_AGE_SECS = 6 * 60 * 60; // 6 hours

router.get('/get_outdoor_aqi/', function(req, res) {
   var ESDR_API_ROOT_URL = 'http://esdr.cmucreatelab.org/api/v1';
   var DEMO_SPECK_SERIAL_NUMBER = "b5320dc134e7dece9317c53e4e5b1f08";

   var aqi_value = OUTDOOR_AQI_DEFAULT_VALUE;
   if (req.headers && req.headers['serialnumber'] == DEMO_SPECK_SERIAL_NUMBER) {
      var feedIdOrApiKey = 2697;
      var channelName = OUTDOOR_AQI_DEFAULT_CHANNEL_NAME;

      // TODO: if we want to make this a little more flexible, and not just hardcoded to the PM2_5 channel, we could
      // use the /feeds/FEED_ID_OR_API_KEY/most-recent ESDR API method and get back the most recent for all channels
      // in the feed, and then iterate over the channel names to see if any match the various permutations of PM 2.5
      // channels.
      superagent
            .get(ESDR_API_ROOT_URL + "/feeds/" + feedIdOrApiKey + "/channels/" + channelName + "/most-recent")
            .end(function(err, mostRecentResponse) {
                    if (err) {
                       log.error("Failed to get most recent value for feed.channel [" + feedIdOrApiKey + "." + channelName + "]: " + err);
                    }
                    else {
                       if (mostRecentResponse &&
                           mostRecentResponse.body &&
                           mostRecentResponse.body.data &&
                           mostRecentResponse.body.data.channels &&
                           mostRecentResponse.body.data.channels[channelName] &&
                           mostRecentResponse.body.data.channels[channelName]['mostRecentDataSample']) {

                          // get the sample data
                          var mostRecentDataSample = mostRecentResponse.body.data.channels[channelName]['mostRecentDataSample'];
                          if (mostRecentDataSample['timeSecs'] && mostRecentDataSample['value']) {
                             // make sure the most recent sample isn't too old
                             if (mostRecentDataSample['timeSecs'] >= (Date.now() / 1000 - OUTDOOR_AQI_MAX_AGE_SECS)) {
                                aqi_value = mostRecentDataSample['value'];
                             }
                             else {
                                log.debug("The mostRecentDataSample found for feed.channel [" + feedIdOrApiKey + "." + channelName + "] its timestamp of [" + mostRecentDataSample['timeSecs'] + "] is too old.");
                             }
                          }
                          else {
                             log.info("The mostRecentDataSample found for feed.channel [" + feedIdOrApiKey + "." + channelName + "] contains no time and/or value.");
                          }
                       }
                       else {
                          log.info("No mostRecentDataSample found for feed.channel [" + feedIdOrApiKey + "." + channelName + "]: " + err);
                       }
                    }
                    res.set('Content-Type', 'text/plain').send("get_outdoor_aqi=" + aqi_value + "\r\n");
                 });
   }
   else {
      res.set('Content-Type', 'text/plain').send("get_outdoor_aqi=" + aqi_value + "\r\n");
   }
});

router.get('/get_message/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_message=" + config.get("firmware:message") + "\r\n");
});

router.get('/get_scalar/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_scalar=" + config.get("firmware:scalar") + "\r\n");
});

router.get('/get_version/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_version=" + config.get("firmware:version") + "\r\n");
});

//======================================================================================================================
// DEPRECATED
//----------------------------------------------------------------------------------------------------------------------

router.get('/what-is-speck', function(req, res) {
   res.redirect('/');
});

router.get('/particles', function(req, res) {
   res.redirect('/learn/particles');
});

router.get('/faq', function(req, res) {
   res.redirect('/support/faq');
});

router.get('/contact', function(req, res) {
   res.redirect('/support/contact-us');
});

router.get('/buy', function(req, res) {
   res.redirect('http://store.specksensor.com/products/speck');
});

router.get('/software', function(req, res) {
   res.redirect('/support/software');
});

router.get('/legacy-software', function(req, res) {
   res.redirect('/support/legacy-software');
});

router.get('/data', function(req, res) {
   res.redirect('/public-data');
});

router.get('/terms', function(req, res) {
   res.redirect('/policies-and-terms');
});

//======================================================================================================================

module.exports = router;
