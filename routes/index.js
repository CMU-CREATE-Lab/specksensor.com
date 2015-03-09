var express = require('express');
var router = express.Router();

//======================================================================================================================

router.get('/', function(req, res) {
   if (req.isAuthenticated()) {
      res.redirect('/dashboard');
   }
   else {
      res.render('index', {
         section : "home",
         hero_image : { filename : "home.png", css_class : "anchor_right" },
         hero_text : {
            css_class : "home-hero-text",
            text : "The Speck monitors fine particle concentration levels in your home, and empowers you to understand and take control of your air quality."
         }
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
      section : "what-is-pm",
      hero_image : { filename : "what-is-pm.png", css_class : "anchor_left" },
      hero_text : {
         css_class : "what-is-speck-hero-text",
         text : "Speck is an air quality monitor that detects fine particulate matter in your indoor environment and informs you about trends and changes in particle concentration."
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

router.get('/terms', function(req, res) {
   res.render('terms', { title : "Terms and Conditions", section : "terms" });
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
   res.set('Content-Type', 'text/plain').send("get_outdoor_aqi=-1\r\n");
});

router.get('/get_message/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_message=NULL\r\n");
});

router.get('/get_scaler/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_scaler=408\r\n");
});

router.get('/get_version/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_version=10\r\n");
});

//======================================================================================================================

module.exports = router;
