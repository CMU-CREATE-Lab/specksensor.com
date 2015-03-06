var express = require('express');
var router = express.Router();

//======================================================================================================================

router.get('/', function(req, res) {
   if (req.isAuthenticated()) {
      res.redirect('/dashboard');
   }
   else {
      res.render('index', { section : "home", hero_image : {filename: "home.png", css_class: "anchor_right"} });
   }
});

//----------------------------------------------------------------------------------------------------------------------

router.get('/what_is_speck', function(req, res) {
   res.render('about/what-is-speck', { title : "What is Speck?", section : "what-is-speck" });
});

router.get('/what_is_pm', function(req, res) {
   res.render('about/what-is-pm', { title : "What Are Fine Particles?", section : "what-is-pm" });
});

router.get('/pm_sources', function(req, res) {
   res.render('about/particle-sources', { title : "Particle Sources", section : "particle-sources" });
});

router.get('/pathways_to_better_air', function(req, res) {
   res.render('about/pathways-to-better-air', { title : "Pathways to Better Air", section : "pathways-to-better-air" });
});

//----------------------------------------------------------------------------------------------------------------------

router.get('/software', function(req, res) {
   res.render('software', { title : "Software", section : "software" });
});

//----------------------------------------------------------------------------------------------------------------------

router.get('/about-us', function(req, res) {
   res.render('about-us', { title : "About Us", section : "about-us" });
});
//----------------------------------------------------------------------------------------------------------------------

router.get('/contact', function(req, res) {
   res.render('contact', { title : "Contact", section : "contact" });
});

//----------------------------------------------------------------------------------------------------------------------

router.get('/terms', function(req, res) {
   res.render('terms', { title : "Terms and Conditions", section : "terms" });
});

//----------------------------------------------------------------------------------------------------------------------

router.get('/data', function(req, res) {
   res.render('data', { title : "Data", section : "data" });
});

router.get('/signup', function(req, res) {
   res.render('signup', { title : "Sign Up", section : "login" });
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

module.exports = router;
