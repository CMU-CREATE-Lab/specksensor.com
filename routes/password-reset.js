var express = require('express');
var router = express.Router();
var ValidationError = require('../lib/errors').ValidationError;
var RemoteError = require('../lib/errors').RemoteError;
var config = require('../config');
var httpStatus = require('http-status');

module.exports = function(UserModel) {

   router.get('/', function(req, res) {
      res.render('password-reset', { title : "Reset Password" });
   });

   router.post('/', function(req, res) {
      UserModel.createResetPasswordRequest(req.body.email, function(err, result) {
         if (err) {
            if (err instanceof ValidationError) {
               return res.jsendClientError(err.message, err.data, httpStatus.UNPROCESSABLE_ENTITY);
            }
            if (err instanceof RemoteError) {
               return res.jsendPassThrough(err.data);
            }
            return res.jsendServerError(err.message, err.data);
         }

         // build the return object
         var obj = {
            email : result.email
         };
         // See whether we should return the reset password token.  E.g., in most cases, we simply
         // want ESDR to email the reset password token to the user, to ensure the email address is
         // correct and actually belongs to the person who requested the reset. But, when
         // testing, just return it here so I don't have to write tests that check an email
         // account :-)
         if (config.get("client:resetPasswordToken:willReturnViaApi") && result.resetPasswordToken) {
            obj.resetPasswordToken = result.resetPasswordToken
         }

         return res.jsendSuccess(obj, httpStatus.CREATED);

      });
   });

   router.put('/', function(req, res) {
      UserModel.setNewPassword(req.body.token, req.body.password, function(err, result) {
         if (err) {
            if (err instanceof ValidationError) {
               return res.jsendClientError(err.message, err.data, httpStatus.UNPROCESSABLE_ENTITY);
            }
            if (err instanceof RemoteError) {
               return res.jsendPassThrough(err.data);
            }
            return res.jsendServerError(err.message, err.data);
         }

         return res.jsendSuccess(null, httpStatus.OK);

      });
   });

   router.get('/:resetPasswordToken', function(req, res) {
      // since we'll be injecting the reset password token into JavaScript,
      // be paranoid and remove anything that's not a valid hex character
      var cleanedResetPasswordToken = (req.params.resetPasswordToken) ? req.params.resetPasswordToken.replace(/([^a-f0-9]+)/gi, '') : "";
      res.render('password-reset', { title : "Reset Password", resetPasswordToken : cleanedResetPasswordToken });
   });

   return router;
};

