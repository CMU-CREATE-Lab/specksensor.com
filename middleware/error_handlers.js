var httpStatus = require('http-status');
var S = require('string');
var log = require('log4js').getLogger('specksensor:middleware:error_handlers');

var isApi = function(req) {
   return (S(req.url).startsWith("/api/")
           ||
           (
           req.method.toLowerCase() == "post" &&
           S(req.url).startsWith("/login")
           )
           ||
           (
           req.method.toLowerCase() == "get" &&
           S(req.url).startsWith("/access-token")
           )
           ||
           (
           (req.method.toLowerCase() == "put" || req.method.toLowerCase() == "post") &&
           S(req.url).startsWith("/password-reset")
           )
   );
};

var handleError = function(req, res, message, data, statusCode) {
   if (isApi(req)) {
      res.jsendServerError(message, data, statusCode);
   }
   else {
      res.status(statusCode).render('error', {
         title : "HTTP " + statusCode,
         message : message
      });
   }
};

module.exports = {
   http404 : function(req, res, next) {
      var statusCode = httpStatus.NOT_FOUND;

      if (isApi(req)) {
         res.jsendClientError("Resource not found", {url : req.url}, statusCode);
      }
      else {
         res.status(statusCode).render('404');
      }
   },

   dev : function(err, req, res, next) {
      log.debug("In DEV error handler: " + JSON.stringify(err, null, 3));
      var message = err.message;
      var statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;

      handleError(req, res, message, err, statusCode);
   },

   prod : function(err, req, res, next) {
      log.error("Unexpected error: " + err);
      var message = "Sorry, an unexpected error occurred";
      var statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;

      handleError(req, res, message, null, statusCode);
   }
};