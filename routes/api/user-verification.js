var express = require('express');
var router = express.Router();
var config = require('../../config');
var esdr = require('../../lib/esdr');
var RemoteError = require('../../lib/errors').RemoteError;
var httpStatus = require('http-status');
var log = require('log4js').getLogger('specksensor:routes:api:user-verification');

router.post('/',
            function(req, res, next) {
               var email = req.body.email;
               log.debug("Received POST to request a resend of the verification token for user with email [" + email + "]");
               if (email) {
                  // delegate verification to ESDR
                  esdr.requestVerificationEmailResend(email, function(err, result) {
                     if (err) {
                        if (err instanceof RemoteError) {
                           return res.jsendPassThrough(err.data);
                        }
                        var message = "Error while trying to request a resend of the verification token for user with email [" + email + "]";
                        log.error(message + ": " + err);
                        return res.jsendServerError(message);
                     }

                     res.jsendPassThrough(result);
                  });
               }
               else {
                  return res.jsendClientError("Email not specified.", null, httpStatus.UNPROCESSABLE_ENTITY);  // HTTP 422 Unprocessable Entity
               }
            }
);

router.put('/',
           function(req, res, next) {
              var verificationToken = req.body.token;
              log.debug("Received PUT to verify token [" + verificationToken + "]");
              if (verificationToken) {
                 // delegate verification to ESDR
                 esdr.verifyUser(verificationToken, function(err, result) {
                    if (err) {
                       if (err instanceof RemoteError) {
                          return res.jsendPassThrough(err.data);
                       }
                       var message = "Error while trying to verify user with verification token [" + verificationToken + "]";
                       log.error(message + ": " + err);
                       return res.jsendServerError(message);
                    }

                    res.jsendPassThrough(result);
                 });
              }
              else {
                 return res.jsendClientError("Verification token not specified.", null, httpStatus.UNPROCESSABLE_ENTITY);  // HTTP 422 Unprocessable Entity
              }
           }
);

module.exports = router;
