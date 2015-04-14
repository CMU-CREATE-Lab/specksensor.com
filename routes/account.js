var express = require('express');
var router = express.Router();
var esdr = require('../lib/esdr');

var log = require('log4js').getLogger('specksensor:routes:account');

router.get('/',
           function(req, res, next) {
              esdr.getUserInfo(req.user.esdrUserId, req.user.accessToken, function(err, userInfoResponse) {
                 // TODO: What to do if there's an error?
                 if (err) {
                    log.error("GET /account error: " + JSON.stringify(err, null, 3))
                    res.render('error',
                               {
                                  title : "Unexpected Error",
                                  section : "account",
                                  message : "Sorry, an unexpected error has occurred. Please try again later or contact us for help."
                               });
                 }
                 else {
                    log.debug("req.user=" + JSON.stringify(userInfoResponse, null, 3));

                    res.render('account',
                               {
                                  title : "Account",
                                  section : "account",
                                  userInfo : userInfoResponse.data,
                                  isInteriorPage : true
                               });
                 }
              });
           });

module.exports = router;
