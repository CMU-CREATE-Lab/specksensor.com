var express = require('express');
var router = express.Router();
var httpStatus = require('http-status');

router.get('/',
           function(req, res) {
              return res.jsendSuccess({
                                         token : req.isAuthenticated() ? req.user.accessToken : null
                                      }, httpStatus.OK); // HTTP 200 OK
           });

module.exports = router;
