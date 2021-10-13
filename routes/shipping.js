var express = require('express');
var router = express.Router();
var config = require('../config');

var google = require('googleapis');
var fusiontables = google.fusiontables('v2');
var nr = require('newrelic');
var log = require('log4js').getLogger('specksensor:routes:shipping');

//======================================================================================================================

router.get('/', function(req, res) {
   res.render('shipping', { title : "Shipping", section : "shipping" });
});

router.post('/', function(req, res) {
   var invoiceNumber = req.body.invoice;
   var serialNumbers = req.body.serials;

   // Remove duplicate serials that may have been accidently scanned
   var uniqueSerialNumbers = serialNumbers.reduce(function(serialsArray, serial) {
      if (serial && serialsArray.indexOf(serial) < 0) {
         serialsArray.push(serial);
      }
      return serialsArray;
   }, []);

   // TODO: Apparently there is a limit of 500 inserts per request.
   var sqlStatements = "";
   var inputDate = new Date();
   inputDate = inputDate.toLocaleDateString() + " " + inputDate.toLocaleTimeString();
   uniqueSerialNumbers.map(function(serialNumber) {
      sqlStatements += "INSERT INTO " + config.get("googleServices:fusionTables:tableIds:shippingTableId") + "('Input Date', 'Invoice Number', 'Speck Serial Number') VALUES ('" + inputDate + "', '" + invoiceNumber + "', '" + serialNumber + "');";
   });

   /**
    * The JWT authorization is ideal for performing server-to-server
    * communication without asking for user consent.
    *
    * Suggested reading for Admin SDK users using service accounts:
    * https://developers.google.com/admin-sdk/directory/v1/guides/delegation
    *
    * Note on the private_key.pem:
    * Node.js currently does not support direct access to the keys stored within
    * PKCS12 file (see issue comment
    * https://github.com/joyent/node/issues/4050#issuecomment-8816304)
    * so the private key must be extracted and converted to a passphrase-less
    * RSA key: openssl pkcs12 -in key.p12 -nodes -nocerts > key.pem
    *
    */
   var authClient = new google.auth.JWT(
         config.get("googleServices:accountEmail"),
         config.get("googleServices:keyPath"),
         null,
         ['https://www.googleapis.com/auth/fusiontables']
   );

   authClient.authorize(nr.createTracer("FusionTables:authorize", function(err, tokens) {
      if (err) {
         log.error("Error trying to authenticate with Fusion Tables: " + err);
         res.status(500).send('Error authenticating with Google Fusion Tables');
      }
   }));

   // Make an authorized request to insert a new row into the fusion table
   fusiontables.query.sql(
         {
            auth : authClient,
            sql : sqlStatements
         },
         nr.createTracer("FusionTables:insert",
                         function(err, resp) {
                            if (err || !resp) {
                               log.error("Error trying to insert into Fusion Tables: " + err);
                               res.status(500).send('Error submitting data');
                            }
                            else {
                               res.render('shipping', { title : "Shipping", section : "shipping" });
                            }
                            log.debug("Fusion Tables response: " + JSON.stringify(resp, null, 3));
                         }
         ));
});

//======================================================================================================================

module.exports = router;
