var express = require('express');
var router = express.Router();
var config = require('../config');
var superagent = require('superagent');

var google = require('googleapis');
var fusiontables = google.fusiontables('v2');

//======================================================================================================================

router.get('/', function(req, res) {
  res.render('calibration', { title : "Calibration", section : "calibration" });
});

router.post('/', function(req, res) {
  var calibrationBatch = req.body.calibration;
  var speckSerials = req.body.specks.serials;
  var speckLocations = req.body.specks.locations;
  var locationIndiciesToUse = [];

  // Remove duplicate serials that may have been accidently scanned
  var uniqueSerialNumbers = speckSerials.reduce(function(serialsArray, serial, index){
    if (serial && speckLocations[index] && serialsArray.indexOf(serial) < 0) {
      serialsArray.push(serial);
      locationIndiciesToUse.push(index);
    }
    return serialsArray;
  },[]);

  // TODO: Apparently there is a limit of 500 inserts per request.
  var sqlStatements = "";
  var inputDate = new Date();
  inputDate = inputDate.toLocaleDateString() + " " + inputDate.toLocaleTimeString();
  for (var i = 0; i < uniqueSerialNumbers.length; i++) {
    sqlStatements += "INSERT INTO " + config.get("googleServices:fusionTables:tableIds:calibrationTableId") + "('Input Date', 'Calibration Batch Number', 'Speck Serial Number', 'Location') VALUES ('" + inputDate + "', '" + calibrationBatch + "', '" + uniqueSerialNumbers[i] + "', '" + speckLocations[locationIndiciesToUse[i]] + "');";
  }

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

  authClient.authorize(function(err, tokens) {
    if (err) {
      // TODO: Need to return some error to the user if authentication failed
      console.log(err);
      return;
    }
  });

  // Make an authorized request to insert a new row into the fusion table
  fusiontables.query.sql(
    {
      auth: authClient,
      sql:  sqlStatements
    }, function(err, resp) {
      if (err) {
        // TODO: Need to return some error to the user if insert failed
        console.log(err);
        return;
      }
      console.log(resp);
    }
  );

  res.render('calibration', { title : "Calibration", section : "calibration" });
});

//======================================================================================================================

module.exports = router;
