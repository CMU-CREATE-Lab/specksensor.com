var express = require('express');
var router = express.Router();
var config = require('../config');
var superagent = require('superagent');
var log = require('log4js').getLogger('specksensor:routes:index');

//======================================================================================================================

router.get('/', function(req, res) {
   res.render('index', {
      section : "home",
      carousel : [
         {
            caption : "The Speck monitors fine particle concentration levels in your home, and empowers you to understand and take control of your air quality.",
            captionCssClass : "home-hero-text1",
            url : "home.png",
            imageCssClass : "anchor_right",
            isActive : true
         },
         {
            caption : "Fine particles are invisible to the naked eye, but can have very harmful impacts on your health. These pollutants can lodge deep into your lungs because they are smaller than a human hair.",
            url : "what-is-pm.png",
            captionCssClass : "home-hero-text2",
            imageCssClass : "anchor_left"
         },
         {
            caption : "Fine particles are produced by many sources, including household activities such as cooking and cleaning. Understanding how these particles are generated can help you take better control of the air you breathe at home.",
            url : "pm-sources.png",
            captionCssClass : "home-hero-text3",
            imageCssClass : "anchor_right"
         },
         {
            caption : "By monitoring readings on the Speck, you can become an expert about your air quality, and run experiments to test a variety of approaches to reduce fine particle concentration in your home.",
            url : "pathways-to-better-air.png",
            captionCssClass : "home-hero-text4",
            imageCssClass : "anchor_left"
         }
      ]
   });
});

//----------------------------------------------------------------------------------------------------------------------

router.get('/what-is-speck', function(req, res) {
   res.render('about/what-is-speck', {
      title : "What is Speck?",
      section : "what-is-speck",
      hero_image : { filename : "what-is-speck.png", css_class : "anchor_left" },
      hero_text : {
         css_class : "what-is-speck-hero-text",
         text : "Speck is an air quality monitor that detects fine particulate matter in your indoor environment and informs you about trends and changes in particle concentration."
      }
   });
});

router.get('/particles', function(req, res) {
   res.render('about/particles', {
      title : "What is PM?",
      section : "particles",
      hero_image : { filename : "what-is-pm.png", css_class : "anchor_left" },
      hero_text : {
         css_class : "particles-hero-text",
         text : "Fine particles (PM<sub>2.5</sub>) are invisible pollutants that can be harmful to your health. There may be several sources of PM<sub>2.5</sub> inside your home. Monitoring these particles can help identify ways to improve your indoor air quality and breathe easier."
      }
   });
});

//----------------------------------------------------------------------------------------------------------------------

router.get('/about-us', function(req, res) {
   res.render('about-us', { title : "About Us", section : "about-us" });
});

router.get('/buy', function(req, res) {
   res.redirect('http://store.specksensor.com/products/speck');
});

router.get('/contact', function(req, res) {
   res.redirect('about-us');
});

router.get('/data', function(req, res) {
   res.render('data', { title : "Data", section : "data" });
});

router.get('/signup', function(req, res) {
   res.render('signup', { title : "Sign Up", section : "login" });
});

router.get('/software', function(req, res) {
   res.render('software', { title : "Software", section : "software" });
});

router.get('/legacy-software', function(req, res) {
   res.render('legacy-software', { title : "Legacy Software", section : "software" });
});

router.get('/terms', function(req, res) {
   res.render('terms', { title : "Terms and Conditions", section : "terms" });
});

router.get('/jobs', function(req, res) {
   res.render('jobs', { title : "Jobs", section : "jobs" });
});

router.get('/faq', function(req, res) {
   res.render('faq', { title : "FAQs", section : "faq" });
});

router.get('/air-quality-by-zip-code', function(req, res) {
   res.render('air-quality-by-zip-code', {
      title : "Air Quality Zip Code Search",
      section : "air-quality-by-zip-code"
   });
});

//======================================================================================================================

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

router.get('/get_time/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_time=" + parseInt(Date.now() / 1000) + "\r\n");
});

var OUTDOOR_AQI_DEFAULT_VALUE = -1;
var OUTDOOR_AQI_MAX_AGE_SECS = 6 * 60 * 60; // 6 hours

router.get('/get_outdoor_aqi/', function(req, res) {
   var ESDR_API_ROOT_URL = 'http://esdr.cmucreatelab.org/api/v1';
   var DEMO_SPECK_SERIAL_NUMBER = "b5320dc134e7dece9317c53e4e5b1f08";

   if (req.headers && req.headers['serialnumber'] == DEMO_SPECK_SERIAL_NUMBER) {
      var feedIdOrApiKey = 2697;
      var channelName = "PM2_5";

      // TODO: if we want to make this a little more flexible, and not just hardcoded to the PM2_5 channel, we could
      // use the /feeds/FEED_ID_OR_API_KEY/most-recent ESDR API method and get back the most recent for all channels
      // in the feed, and then iterate over the channel names to see if any match the various permutations of PM 2.5
      // channels.
      superagent
            .get(ESDR_API_ROOT_URL + "/feeds/" + feedIdOrApiKey + "/channels/" + channelName + "/most-recent")
            .end(function(err, mostRecentResponse) {
                    console.log(JSON.stringify(mostRecentResponse.body, null, 3));
                    var aqi_value = OUTDOOR_AQI_DEFAULT_VALUE;
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

module.exports = router;
