var log = require('log4js').getLogger('specksensor:lib:esdr');
var config = require('../config');
var RemoteError = require('../lib/errors').RemoteError;
var ValidationError = require('../lib/errors').ValidationError;
var superagent = require('superagent');
var httpStatus = require('http-status');

var ESDR_API_ROOT_URL = config.get("esdr:apiRootUrl");
var ESDR_OAUTH_TOKEN_URL = config.get("esdr:oauthTokenUrl");
var CLIENT = {
   clientName : config.get("client:name"),
   clientSecret : config.get("client:secret")
};
/**
 * Attempts to call ESDR to find the client with the given <code>clientName</code>.  If successful, the JSend response
 * from ESDR is given to the given <code>callback</code>.  This method assumes that the client to find is public since
 * no authorization is sent with the request.
 *
 * @param {string} clientName The clientName of the client to find
 * @param {function} callback The callback function to receive the error or success data
 */
var findClient = function(clientName, callback) {
   superagent
         .get(ESDR_API_ROOT_URL + "/clients?where=clientName="+clientName)
         .end(function(err, res) {
                 if (err) {
                    log.error("Failed to get client from ESDR: " + err);

                    return callback(err);
                 }

                 // see whether this was a JSend response
                 if (isJSendResponse(res)) {
                    if (res.body.status == 'success') {
                       return callback(null, res.body);
                    }
                    return callback(new RemoteError(res.body));
                 }

                 // if not a JSend response, then create a new JSend server error response
                 return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode));
              });
};

/**
 * Attempts to call ESDR to create the given <code>client</code>.  If successful, the JSend response from ESDR is given
 * to the given <code>callback</code>
 * @param {object} client The client to create
 * @param {function} callback The callback function to receive the error or success data
 */
var createClient = function(client, callback) {
   superagent
         .post(ESDR_API_ROOT_URL + "/clients")
         .send(client)
         .end(function(err, res) {
                 if (err) {
                    log.error("Failed to create client in ESDR: " + err);

                    return callback(err);
                 }

                 // see whether this was a JSend response
                 if (isJSendResponse(res)) {
                    if (res.body.status == 'success') {
                       return callback(null, res.body);
                    }
                    return callback(new RemoteError(res.body));
                 }

                 // if not a JSend response, then create a new JSend server error response
                 return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode));
              });
};

var createUser = function(user, callback) {
   superagent
         .post(ESDR_API_ROOT_URL + "/users")
         .auth(CLIENT.clientName, CLIENT.clientSecret)
         .send(user)
         .end(function(err, res) {
                 if (err) {
                    log.error("Failed to create user in ESDR: " + err);

                    return callback(err);
                 }

                 // see whether this was a JSend response
                 if (isJSendResponse(res)) {
                    if (res.body.status == 'success') {
                       return callback(null, res.body);
                    }
                    return callback(new RemoteError(res.body));
                 }

                 // if not a JSend response, then create a new error
                 return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode));
              });
};

var getUserInfo = function(esdrUserId, accessToken, callback) {
   superagent
         .get(ESDR_API_ROOT_URL + "/users/" + esdrUserId)
         .set({
                 Authorization : "Bearer " + accessToken
              })
         .end(function(err, res) {
                 if (err) {
                    log.error("Failed to get user from ESDR: " + err);

                    return callback(err);
                 }

                 // see whether this was a JSend response
                 if (isJSendResponse(res)) {
                    if (res.body.status == 'success') {
                       return callback(null, res.body);
                    }
                    return callback(new RemoteError(res.body));
                 }

                 // if not a JSend response, then create a new error
                 return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode));
              });
};

var authenticateUser = function(email, password, callback) {
   log.debug("esdr.authenticateUser(" + email + ")");
   superagent
         .post(ESDR_OAUTH_TOKEN_URL)
         .type('form')
         .send({
                  grant_type : 'password',
                  client_id : config.get("client:name"),
                  client_secret : config.get("client:secret"),
                  username : email,
                  password : password
               })
         .end(function(err, res) {
                 if (err) {
                    log.error("   ESDR oauth failed: " + err);
                    return callback(err, false);
                 }

                 try {
                    if (res.statusCode === httpStatus.OK) {
                       var tokenResponse = res.body;
                       log.debug("esdr.authenticateUser: " + JSON.stringify(res.body, null, 3));
                       var user = {
                          esdrUserId : tokenResponse.userId,
                          lastLogin : new Date(),
                          accessToken : tokenResponse.access_token,
                          refreshToken : tokenResponse.refresh_token,
                          accessTokenExpiration : new Date(new Date().getTime() + (tokenResponse.expires_in * 1000))
                       };
                       return callback(null, user);
                    }
                    else if (res.statusCode === httpStatus.UNAUTHORIZED) {
                       return callback(null, false, {
                          message : 'Client authentication failed.',
                          error : "Invalid client credentials",
                          error_description : "Client authentication failed"
                       });
                    }
                    else if (res.statusCode === httpStatus.FORBIDDEN) {
                       var jsonResponse = res.body;

                       return callback(null, false, {
                          message : 'User authentication failed.',
                          error :             jsonResponse.error || "unknown error",
                          error_description : jsonResponse.error_description || "unknown error while authenticating user " + email
                       });
                    }
                    else {
                       log.error("   ESDR oauth for user [" + email + "] failed due to unknown error.  HTTP status [" + res.statusCode + "]");
                       return callback(null, false, { message : 'Unknown error, HTTP status [' + res.statusCode + ']' });
                    }
                 }
                 catch (e) {
                    log.error("   Unexpected exception while trying to authenticate user [" + email + "] with ESDR: " + e);
                    return callback(null, false, { message : 'Unexpected error, please try again later.' }); // TODO: should this be null and false?
                 }
              });
};

var refreshAccessToken = function(refreshToken, callback) {

   superagent
         .post(ESDR_OAUTH_TOKEN_URL)
         .type('form')
         .send({
                  grant_type : 'refresh_token',
                  client_id : config.get("client:name"),
                  client_secret : config.get("client:secret"),
                  refresh_token : refreshToken
               })
         .end(function(err, res) {
                 if (err) {
                    log.error("   ESDR refresh token failed: " + err);
                    return callback(err);
                 }

                 try {
                    if (res.statusCode === httpStatus.OK) {
                       var tokenResponse = res.body;
                       log.debug("esdr.refreshAccessToken: " + JSON.stringify(res.body, null, 3));
                       var newTokens = {
                          accessToken : tokenResponse.access_token,
                          refreshToken : tokenResponse.refresh_token,
                          accessTokenExpiration : new Date(new Date().getTime() + (tokenResponse.expires_in * 1000))
                       };
                       return callback(null, newTokens);
                    }
                    else if (res.statusCode === httpStatus.UNAUTHORIZED) {
                       return callback(new RemoteError({
                                                          code : res.statusCode,
                                                          status : 'error',
                                                          data : null,
                                                          message : "Client authentication failed"
                                                       }));
                    }
                    else if (res.statusCode === httpStatus.FORBIDDEN) {
                       return callback(new RemoteError({
                                                          code : res.statusCode,
                                                          status : 'error',
                                                          data : null,
                                                          message : "Invalid refresh token"
                                                       }));
                    }
                    else {
                       log.error("   Access token refresh failed due to unknown error.  HTTP status [" + res.statusCode + "]");
                       return callback(new RemoteError({
                                                          code : res.statusCode,
                                                          status : 'error',
                                                          data : null,
                                                          message : "Unexpected error"
                                                       }));
                    }
                 }
                 catch (e) {
                    log.error("   Unexpected exception while trying to refresh access token: " + e);
                    return callback(e);
                 }
              });

};

var verifyUser = function(verficationToken, callback) {
   superagent
         .put(ESDR_API_ROOT_URL + "/user-verification")
         .send({ token : verficationToken })
         .end(function(err, res) {
                 if (err) {
                    return callback(err);
                 }

                 // see whether this was a JSend response
                 if (isJSendResponse(res)) {
                    if (res.body.status == 'success') {
                       return callback(null, res.body);
                    }
                    return callback(new RemoteError(res.body));
                 }

                 // if not a JSend response, then create a new error
                 return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode + " while trying to verify user with token [" + verficationToken + "]"));
              }
   );
};

var requestVerificationEmailResend = function(email, callback) {
   superagent
         .post(ESDR_API_ROOT_URL + "/user-verification")
         .auth(CLIENT.clientName, CLIENT.clientSecret)
         .send({
                  email : email
               })
         .end(function(err, res) {
                 if (err) {
                    return callback(err);
                 }

                 // see whether this was a JSend response
                 if (isJSendResponse(res)) {
                    if (res.body.status == 'success') {
                       return callback(null, res.body);
                    }
                    return callback(new RemoteError(res.body));
                 }

                 // if not a JSend response, then create a new error
                 return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode + " while trying to verify user with token [" + verficationToken + "]"));
              }
   );
};

var createResetPasswordRequest = function(email, callback) {
   if (email) {
      email = email.trim();
      superagent
            .post(ESDR_API_ROOT_URL + "/password-reset")
            .auth(CLIENT.clientName, CLIENT.clientSecret)
            .send({
                     email : email
                  })
            .end(function(err, res) {
                    if (err) {
                       return callback(err);
                    }

                    // see whether this was a JSend response
                    if (isJSendResponse(res)) {
                       if (res.body.status == 'success') {
                          return callback(null, res.body);
                       }
                       return callback(new RemoteError(res.body));
                    }

                    // if not a JSend response, then create a new error
                    return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode + " while trying to request a password reset for email [" + email + "]"));
                 }
      );
   }
   else {
      process.nextTick(function() {
         callback(new ValidationError("Email address required"));
      });
   }
};

var setNewPassword = function(token, newPassword, callback) {
   if (token) {
      if (newPassword) {
         superagent
               .put(ESDR_API_ROOT_URL + "/password-reset")
               .send({
                        password : newPassword,
                        token : token
                     })
               .end(function(err, res) {
                       if (err) {
                          return callback(err);
                       }

                       // see whether this was a JSend response
                       if (isJSendResponse(res)) {
                          if (res.body.status == 'success') {
                             return callback(null, res.body);
                          }
                          return callback(new RemoteError(res.body));
                       }

                       // if not a JSend response, then create a new error
                       return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode + " while trying to set a password for token [" + token + "]"));
                    }
         );
      }
      else {
         process.nextTick(function() {
            callback(new ValidationError("New password required"));
         });
      }
   }
   else {
      process.nextTick(function() {
         callback(new ValidationError("Reset password token required"));
      });
   }
};

var createProduct = function(product, callback) {
   superagent
         .post(ESDR_API_ROOT_URL + "/products")
         .send(product)
         .end(function(err, res) {
                 if (err) {
                    log.error("Failed to create product in ESDR: " + err);

                    return callback(err);
                 }

                 // see whether this was a JSend response
                 if (isJSendResponse(res)) {
                    if (res.body.status == 'success') {
                       return callback(null, res.body);
                    }
                    return callback(new RemoteError(res.body));
                 }

                 // if not a JSend response, then create a new JSend server error response
                 return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode + " while trying to create a product"));
              });
};

var getProductId = function(productName, callback) {
   productName = (productName || "").trim();
   if (productName.length > 0) {
      superagent
            .get(ESDR_API_ROOT_URL + "/products/" + productName + "?fields=id")
            .end(function(err, res) {
                    if (err) {
                       return callback(err);
                    }

                    // see whether this was a JSend response
                    if (isJSendResponse(res)) {
                       if (res.body.status == 'success') {
                          return callback(null, res.body.data.id);
                       }
                       return callback(new RemoteError(res.body));
                    }

                    // if not a JSend response, then create a new error
                    return callback(new Error("Unexpected error: ESDR service responded with HTTP " + res.statusCode + " while trying to get the ID for product [" + productName + "]"));
                 }
      );
   }
   else {
      process.nextTick(function() {
         callback(new ValidationError("Product name required"));
      });
   }
};

var isJSendResponse = function(response) {
   return (response &&
           response['headers'] &&
           response['headers']['content-type'] &&
           response['headers']['content-type'].lastIndexOf("application/json", 0) === 0 &&
           response.body &&
           response.body.status);
};

module.exports.findClient = findClient;
module.exports.createClient = createClient;
module.exports.createUser = createUser;
module.exports.getUserInfo = getUserInfo;
module.exports.authenticateUser = authenticateUser;
module.exports.refreshAccessToken = refreshAccessToken;
module.exports.verifyUser = verifyUser;
module.exports.requestVerificationEmailResend = requestVerificationEmailResend;
module.exports.createResetPasswordRequest = createResetPasswordRequest;
module.exports.setNewPassword = setNewPassword;
module.exports.createProduct = createProduct;
module.exports.getProductId = getProductId;