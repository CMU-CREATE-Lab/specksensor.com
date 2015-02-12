var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger('specksensor:routes:logout');

module.exports = function(UserModel) {

   router.get('/', function(req, res) {
      if (req.user) {
         var userId = req.user.id;
         log.debug("Logout: destroying session for user [" + userId + "]");

         // TODO: Destroying tokens should really only be done once the last session for that user is destroyed.
         // Use case: User logs into the site using two different browsers.  They'll both get the same access token,
         // but if she logs out on one browser, the other browser will still need the oauth tokens.  Revisit this later.
         //process.nextTick(function() {
         //   UserModel.destroyTokens(userId, function(err, wasSuccessful) {
         //      if (err) {
         //         log.error("Error while trying to delete tokens for user [" + userId + "]");
         //      }
         //      else {
         //         log.debug("Tokens destroyed for user [" + userId + "]: " + wasSuccessful);
         //      }
         //   });
         //});
      }
      req.session = null;
      req.logout();
      res.redirect('/');
   });

   return router;
};

