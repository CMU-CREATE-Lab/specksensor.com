var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');

router.get('/', function(req, res) {
   res.render('chrome-app/index',
              {
                 layout : "chrome-app-layout",
                 title : "Speck Registration",
                 googleMapsApiKey : config.get("maps:apiKey"),
                 speckProductId : config.get("product:id"),
                 esdrUserId : req.isAuthenticated() ? req.user.esdrUserId : null
              });
});

module.exports = router;
