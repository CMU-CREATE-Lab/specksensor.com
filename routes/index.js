var express = require('express');
var router = express.Router();
var config = require('../config');
var superagent = require('superagent');

//======================================================================================================================

router.get('/', function(req, res) {
   if (req.isAuthenticated()) {
      res.redirect('/dashboard');
   }
   else {
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
   }
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
   res.render('buy', { title : "Buy", section : "buy" });
});

router.get('/contact', function(req, res) {
   res.render('contact', { title : "Contact", section : "contact" });
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

router.get('/air-quality-by-zip-code', function(req, res) {
   res.render('air-quality-by-zip-code', { title : "Air Quality Zip Code Search", section : "air-quality-by-zip-code" });
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

router.get('/get_outdoor_aqi/', function(req, res) {
  // TODO: Should probably make this a more general function in esdr.js
  var ESDR_API_ROOT_URL = 'http://esdr.cmucreatelab.org/api/v1';
  var demo_speck_serial_number = "e0b9eeba821c2ccae96de9e1e76932d2";
  var aqi_value = -1;
  if (req.headers['serialnumber'] == demo_speck_serial_number) {
    var texas_api_key = "a2fd2312ef53eda80418ee63dd32a184eb708f95a51a4edeeade0bb807a7bac3";
    var channels = "PM2_5";
    // TODO: This fails on initial day rollover because of the note below
    // NOTE: AirNow reports are usually 2 hours behind
    var today = new Date();
    var newDateString =  (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    var firstCaptureTime = newDateString + " 00:00:00";
    var lastCaptureTime = newDateString + " 23:59:59";
    var startTime = Date.parse(firstCaptureTime) / 1000;
    var endTime = Date.parse(lastCaptureTime) / 1000;
    // TODO: Cache values, since AirNow values change every hour and we may be requesting more often
    superagent
      .get(ESDR_API_ROOT_URL + "/feeds/" + texas_api_key + "/channels/" + channels + "/export?from=" + startTime + "&to=" + endTime)
      .end(function(err, esdrRes) {
        if (err) {
          console.log("Error connection to ESDR.");
        }
        var csvData = esdrRes.text;
        if (csvData) {
          try {
            var tmp_aqi = csvData.split(",");
            aqi_value = parseFloat(tmp_aqi[tmp_aqi.length - 1].trim());
          } catch (error) {
            console.log("Failed to get AQI value. Defaulting to -1.");
          }
        }
        res.set('Content-Type', 'text/plain').send("get_outdoor_aqi=" + aqi_value + "\r\n");
      });
  } else {
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
