var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var esdr = require('../lib/esdr');
var log = require('log4js').getLogger('specksensor:middleware:auth');

module.exports = function(UserModel) {

   passport.use(new LocalStrategy({
                                     usernameField : 'email',
                                     passwordField : 'password'
                                  },
                                  function(email, password, done) {
                                     log.debug("Oauth to ESDR for login of user [" + email + "]");
                                     esdr.authenticateUser(email, password, function(err, user, data) {
                                        if (!err && user) {
                                           // If we successfully authenticated the user, then save
                                           UserModel.createOrUpdateTokens(user, function(err, result) {
                                              if (err) {
                                                 return done(err, false);
                                              }
                                              // need to add the ID so we can store it in the session
                                              user.id = result.id;
                                              return done(err, user, data);
                                           });
                                        }
                                        else {
                                           return done(err, user, data);
                                        }
                                     });
                                  }
   ));

   passport.serializeUser(function(user, done) {
      log.debug("serializing user " + user.id + " (ESDR user " + user.esdrUserId + ")");
      done(null, user.id);
   });

   passport.deserializeUser(function(id, done) {
      UserModel.findById(id, function(err, user) {
         log.debug("deserializing user " + id + " (ESDR user " + user.esdrUserId + ")");
         done(err, user);
      });
   });

   /**
    * BearerStrategy
    *
    * This strategy is used to authenticate users based on an access token (aka a bearer token).  The user must have
    * previously authorized a client application, which is issued an access token to make requests on behalf of the
    * authorizing user.
    */
   passport.use(new BearerStrategy(
         function(accessToken, done) {
            log.debug("BearerStrategy auth: validating access token: " + accessToken);
            UserModel.findByAccessToken(accessToken, function(err, user) {
               if (err) {
                  return done(err);
               }
               if (user) {
                  var isExpired = new Date(user.accessTokenExpiration).getTime() < Date.now();
                  if (isExpired) {
                     log.debug("BearerStrategy auth: token expired!");
                     return done(null, false, { message : 'Token expired' });
                  }
                  else {
                     log.debug("BearerStrategy auth: token found!");
                     var info = { scope : '*' };
                     return done(null, user, info);
                  }
               }

               return done(null, false, { message : 'Unknown user' });
            });
         }
   ));
};

