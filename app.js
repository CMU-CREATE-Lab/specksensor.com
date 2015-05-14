var RunMode = require('run-mode');
if (!RunMode.isValid()) {
   console.log("FATAL ERROR: Unknown NODE_ENV '" + process.env.NODE_ENV + "'. Must be one of: " + RunMode.getValidModes());
   process.exit(1);
}

var log4js = require('log4js');
log4js.configure('log4js-config-' + RunMode.get() + '.json');
var log = log4js.getLogger('specksensor');
log.info("Run Mode: " + RunMode.get());

// dependencies
var express = require('express');
var cors = require('cors');
var app = express();

var config = require('./config');
var expressHandlebars = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var compress = require('compression');
var requestLogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var SessionStore = require('express-mysql-session');
var Database = require("./models/Database");
var httpStatus = require('http-status');
var esdr = require('./lib/esdr');
var RemoteError = require('./lib/errors').RemoteError;
var flow = require('nimble');

// decorate express.response with JSend methods
require('jsend-utils').decorateExpressResponse(require('express').response);

var gracefulExit = function() {
   // TODO: any way (or need?) to gracefully shut down the database pool?
   log.info("Shutting down...");
   process.exit(0);
};

// If the Node process ends, then do a graceful shutdown
process
      .on('SIGINT', gracefulExit)
      .on('SIGTERM', gracefulExit);

var doesClientExist = false;
var doesProductExist = false;

flow.series([
               // make sure our client entry exists in ESDR
               function(done) {
                  log.info("Making sure the client exists in ESDR...");
                  esdr.findClient(config.get("client:name"),
                                  function(err, result) {
                                     if (err) {
                                        var msg = "Error while verifying client exists in ESDR: " + err;
                                        log.error(msg);
                                     }
                                     else {
                                        if (result.code == httpStatus.OK) {
                                           if (result.data && result.data.rows && result.data.rows.length == 1) {
                                              doesClientExist = true;
                                           }
                                           else {
                                              log.error("Client [" + config.get("client:name") + "] not found in ESDR!");
                                           }
                                        }
                                        else {
                                           var msg = "Unexpected result code from ESDR when finding client: " + result.code;
                                           log.error(msg);
                                        }
                                     }

                                     done();
                                  });
               },

               // now make sure the product exists in ESDR
               function(done) {
                  log.info("Making sure the Speck product exists in ESDR...");
                  esdr.getProductId(config.get("product:name"),
                                    function(err, productId) {
                                       if (err) {
                                          if (err instanceof RemoteError && err.data && err.data.code == httpStatus.NOT_FOUND) {
                                             log.error("Product not found in ESDR!");
                                          }
                                          else {
                                             log.error("Unexpected error while trying to find the product in ESDR: " + JSON.stringify(err, null, 3));
                                          }
                                       }
                                       else {
                                          log.info("Product already exists in ESDR, no creation necessary.");

                                          //store the product ID in the config, so we can use it elsewhere
                                          config.set("product:id", productId);
                                          doesProductExist = true;
                                       }
                                       done();
                                    });
               }

            ],
            function() {
               if (!doesClientExist || !doesProductExist) {
                  log.error("Server will not be fully functional because the client and/or product could not be verified to exist in ESDR.");
               }

               log.info("Client and product exist in ESDR, now continuing with server startup...");

               // now initialize the database and get a reference to it
               Database.create(function(err, db) {
                  if (err) {
                     log.error("Failed to initialize the database!" + err);
                  }
                  else {
                     log.info("Database initialized, starting app server...");

                     // configure the app
                     try {
                        // VIEW -------------------------------------------------------------------------------------------------------------

                        // setup view engine
                        var viewsDir = path.join(__dirname, 'views');
                        app.set('views', viewsDir);
                        var handlebars = expressHandlebars.create({
                                                                     extname : '.hbs',
                                                                     defaultLayout : 'responsive',
                                                                     layoutsDir : path.join(viewsDir, "layouts"),
                                                                     partialsDir : path.join(viewsDir, "partials"),
                                                                     helpers : {
                                                                        // Got this from http://stackoverflow.com/a/9405113
                                                                        ifEqual : function(v1, v2, options) {
                                                                           if (v1 === v2) {
                                                                              return options.fn(this);
                                                                           }
                                                                           return options.inverse(this);
                                                                        }
                                                                     }
                                                                  });

                        app.engine('hbs', handlebars.engine);
                        app.set('view engine', '.hbs');
                        app.set('view cache', RunMode.isProduction());           // only cache views in production
                        log.info("View cache enabled = " + app.enabled('view cache'));

                        // MIDDLEWARE -------------------------------------------------------------------------------------------------
                        var error_handlers = require('./middleware/error_handlers');

                        // setup middleware
                        app.use(favicon(path.join(__dirname, 'public/favicon.ico')));     // favicon serving
                        app.use(compress());                // enables gzip compression
                        app.use(express.static(path.join(__dirname, 'public')));          // static file serving

                        // enable logging of the ESDR user ID and specksensor.com user ID, if authenticated
                        requestLogger.token('uids', function(req) {
                                                   if (req.user) {
                                                      return req.user.esdrUserId + " " + req.user.id;
                                                   }
                                                   return '- -';
                                                });
                        if (RunMode.isProduction()) {
                           // create a write stream (in append mode)
                           var fs = require('fs');
                           var httpAccessLogDirectory = config.get("httpAccessLogDirectory");
                           log.info("HTTP access log: " + httpAccessLogDirectory);
                           var accessLogStream = fs.createWriteStream(httpAccessLogDirectory, { flags : 'a' });

                           // get the correct remote address from the X-Forwarded-For header
                           requestLogger.token('remote-addr', function(req) {
                              return req.headers['x-forwarded-for'];
                           });

                           // This is just the "combined" format with response time and UIDs appended to the end
                           var logFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms :uids';
                           app.use(requestLogger(logFormat, { stream : accessLogStream }));
                        }
                        else {
                           app.use(requestLogger(':method :url :status :response-time ms :res[content-length] :uids'));      // simple request logging when in non-production mode
                        }
                        app.use(bodyParser.urlencoded({ extended : true }));     // form parsing
                        app.use(bodyParser.json({ limit : '5mb' }));           // json body parsing (5 MB limit)
                        app.use(function(err, req, res, next) { // function MUST have arity 4 here!
                           // catch body parser error (beefed up version of http://stackoverflow.com/a/15819808/703200)
                           if (err) {
                              var statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
                              var message = err.message || (statusCode < httpStatus.INTERNAL_SERVER_ERROR ? "Bad Request" : "Internal Server Error");
                              var data = err;

                              if (statusCode < httpStatus.INTERNAL_SERVER_ERROR) {
                                 res.jsendClientError(message, data, statusCode);
                              }
                              else {
                                 res.jsendServerError(message, data, statusCode);
                              }
                           }
                           else {
                              next();
                           }
                        });

                        // configure passport
                        require('./middleware/auth')(db.users);

                        // CUSTOM MIDDLEWARE ------------------------------------------------------------------------------------------

                        if (RunMode.isProduction()) {
                           app.set('trust proxy', 1) // trust first proxy
                        }

                        // define the various middleware required for routes which need session support
                        var sessionSupport = [
                           cookieParser(),                  // cookie parsing--MUST come before setting up session middleware!
                           session({                        // configure support for storing sessions in the database
                                      key : config.get("cookie:name"),
                                      secret : config.get("cookie:secret"),
                                      store : new SessionStore({
                                                                  host : config.get("database:host"),
                                                                  port : config.get("database:port"),
                                                                  database : config.get("database:database"),
                                                                  user : config.get("database:username"),
                                                                  password : config.get("database:password")
                                                               }),
                                      rolling : false,
                                      cookie : {
                                         httpOnly : true,
                                         secure : RunMode.isProduction()   // enable secure cookies in production, which uses HTTPS
                                      },
                                      proxy : RunMode.isProduction(),       // we use a proxy in production
                                      saveUninitialized : true,
                                      resave : true,
                                      unset : "destroy"
                                   }),
                           passport.initialize(),           // initialize passport (must come AFTER session middleware)
                           passport.session(),              // enable session support for passport
                           function(req, res, next) {
                              log.debug("req.isAuthenticated()=[" + req.isAuthenticated() + "]");
                              res.locals.isAuthenticated = req.isAuthenticated();
                              res.locals.esdrUrl = config.get("esdr:rootUrl");

                              if (req.isAuthenticated()) {
                                 res.locals.user = {
                                    id : req.user.id,
                                    esdrUserId : req.user.esdrUserId
                                 };
                                 delete req.session.redirectToAfterLogin;
                                 delete res.locals.redirectToAfterLogin;
                              }
                              else {
                                 // expose the redirectToAfterLogin page to the view
                                 res.locals.redirectToAfterLogin = req.session.redirectToAfterLogin;
                              }

                              next();
                           },
                           require('./middleware/accessToken').refreshAccessToken(db.users)
                        ];

                        // define the various middleware required for routes which don't need (and should not have!) session support
                        var noSessionSupport = [
                           passport.initialize()         // initialize passport
                        ];

                        // define CORS options and apply CORS to specific route groups
                        var corsSupport = cors({
                                                  origin : '*'
                                               });

                        // ensure the user is authenticated before serving up the page
                        var ensureAuthenticated = function(req, res, next) {
                           if (req.isAuthenticated()) {
                              return next();
                           }
                           // remember where the user was trying to go and then redirect to the login page
                           req.session.redirectToAfterLogin = req.originalUrl;
                           res.redirect('/login')
                        };

                        // ROUTING ----------------------------------------------------------------------------------------------------

                        // configure routing
                        app.use('/api/v1/*', noSessionSupport, corsSupport);
                        app.use('/api/v1/users', require('./routes/api/users')(db.users));
                        app.use('/api/v1/user-verification', require('./routes/api/user-verification'));

                        app.use('/login', sessionSupport, require('./routes/login'));
                        app.use('/logout', sessionSupport, require('./routes/logout')(db.users));
                        app.use('/chrome-app/v1', sessionSupport, require('./routes/chrome-app'));
                        app.use('/access-token', sessionSupport, require('./routes/access-token'));
                        app.use('/password-reset', sessionSupport, require('./routes/password-reset')(db.users));
                        app.use('/shipping', sessionSupport, require('./routes/shipping'));
                        app.use('/calibration', sessionSupport, require('./routes/calibration'));

                        app.use('/dashboard', sessionSupport, ensureAuthenticated, require('./routes/dashboard'));
                        app.use('/devices', sessionSupport, ensureAuthenticated, require('./routes/devices'));
                        app.use('/account', sessionSupport, ensureAuthenticated, require('./routes/account'));

                        app.use('/',
                                sessionSupport,
                                function(req, res, next) {
                                   // if serving a page which doesn't require authentication, then
                                   // forget the remembered redirectToAfterLogin page
                                   delete req.session.redirectToAfterLogin;
                                   next();
                                },
                                require('./routes/index'));

                        // ERROR HANDLERS ---------------------------------------------------------------------------------------------

                        // custom 404
                        app.use(error_handlers.http404);

                        // dev and prod should handle errors differently: e.g. don't show stacktraces in prod
                        app.use(RunMode.isProduction() ? error_handlers.prod : error_handlers.dev);

                        // ------------------------------------------------------------------------------------------------------------

                        // set the port and start the server
                        app.set('port', config.get("server:port"));
                        var server = app.listen(app.get('port'), function() {
                           log.info('Express server listening on port ' + server.address().port);
                        });

                     }
                     catch (err) {
                        log.error("Sever initialization failed ", err.message);
                     }
                  }
               });
            }
);