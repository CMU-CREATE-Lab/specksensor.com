var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/',
           function(req, res) {
              res.render('dashboard',
                         {
                            title : "Dashboard",
                            section : "dashboard",
                            googleMapsApiKey : config.get("maps:apiKey"),
                            speck_product_id : config.get("product:id")
                         });
           });

module.exports = router;
