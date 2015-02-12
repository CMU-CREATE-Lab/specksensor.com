var express = require('express');
var router = express.Router();
var config = require('../../config');
var ValidationError = require('../../lib/errors').ValidationError;
var DuplicateRecordError = require('../../lib/errors').DuplicateRecordError;
var httpStatus = require('http-status');
var log = require('log4js').getLogger('specksensor:routes:api:users');

module.exports = function(UserModel) {

   // Creates a new user
   router.post('/', function(req, res, next) {
      var user = req.body;

      log.debug("Received POST to create user [" + user.email + "]");

      UserModel.create(user, function(err, result) {
         if (err) {
            if (err instanceof ValidationError) {
               return res.jsendClientError("Validation failure", err.data, httpStatus.UNPROCESSABLE_ENTITY);
            }
            if (err instanceof DuplicateRecordError) {
               return res.jsendClientError("User already exists", err.data, httpStatus.CONFLICT);
            }
            return res.jsendServerError(err.message, err.data);
         }

         // build the return object
         var obj = {
            email : result.email,
            displayName : result.displayName
         };
         // See whether we should return the verification token.  E.g., in most cases, we simply
         // want ESDR to email the verification token to the user, to ensure the email address is
         // correct and actually belongs to the person who created the account. But, when
         // testing, just return it here so I don't have to write tests that check an email
         // account :-)
         if (config.get("client:verificationToken:willReturnViaApi") && result.verificationToken) {
            obj.verificationToken = result.verificationToken
         }

         return res.jsendSuccess(obj, httpStatus.CREATED);
      });
   });

   return router;
};

