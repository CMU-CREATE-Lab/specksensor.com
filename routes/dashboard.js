var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/',
           function(req, res) {
              // get any additional products, but only if the ID is non-null (which is our flag that the product was
              // successfully found in ESDR).
              var additionalProducts = Array.isArray(config.get("additionalProducts")) ? config.get("additionalProducts") : [];
              var filteredAdditionalProducts = JSON.stringify(additionalProducts.filter(function(p) {
                 return typeof p.id !== 'undefined' && p.id !== null;
              }));

              res.render('my-data/dashboard',
                         {
                            title : "Dashboard",
                            section : "dashboard",
                            googleMapsApiKey : config.get("maps:apiKey"),
                            speckProductId : config.get("product:id"),
                            additionalProducts : filteredAdditionalProducts
                         });
           });

module.exports = router;
