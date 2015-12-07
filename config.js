var config = require('nconf');
var path = require('path');
var log = require('log4js').getLogger('specksensor:config');
var RunMode = require('run-mode');

var configFile = './config-' + RunMode.get() + '.json';
log.info("Using config file: " + configFile);

config.argv().env().file({ file : configFile });

config.defaults(
      {
         "server" : {
            "url" : "http://localhost:8888",
            "port" : 8888
         },
         "httpAccessLogDirectory" : path.join(__dirname, './logs/access.log'),
         "esdr" : {
            "rootUrl" : "http://localhost:3000",
            "apiRootUrl" : "http://localhost:3000/api/v1",
            "oauthTokenUrl" : "http://localhost:3000/oauth/token"
         },
         "product" : {
            "id" : "THIS_WILL_BE_DETERMINED_AT_RUNTIME",
            "name" : 'speck_v1',
            "prettyName" : 'Speck',
            "vendor" : 'CMU CREATE Lab',
            "description" : 'The Speck particle sensor.',
            "defaultChannelSpecs" : {
               "version" : 1,
               "channels" : {
                  "temperature" : {
                     "prettyName" : "Temperature",
                     "units" : "C",
                     "range" : {
                        "min" : -273.15,
                        "max" : null
                     }
                  },
                  "humidity" : {
                     "prettyName" : "Humidity",
                     "units" : "%",
                     "range" : {
                        "min" : 0,
                        "max" : 100
                     }
                  },
                  "raw_particles" : {
                     "prettyName" : "Raw Signal",
                     "units" : null,
                     "range" : {
                        "min" : 0,
                        "max" : null
                     }
                  },
                  "particle_count" : {
                     "prettyName" : "Particles Per Liter",
                     "units" : "particles/L",
                     "range" : {
                        "min" : 0,
                        "max" : null
                     }
                  },
                  "particle_concentration" : {
                     "prettyName" : "Particle Concentration",
                     "units" : "ug/m^3",
                     "range" : {
                        "min" : 0,
                        "max" : null
                     }
                  }
               }
            }
         },
         "cookie" : {
            "name" : "specksensor_sid",
            "secret" : "YOUR_COOKIE_SECRET"
         },
         "client" : {
            "displayName" : "Speck",
            "name" : "specksensor.com",
            "secret" : "YOUR_OAUTH2_CLIENT_SECRET",
            "email" : "admin@specksensor.com",
            "isPublic" : true,
            "resetPasswordToken" : {
               "url" : "http://localhost:8888/password-reset/:resetPasswordToken",
               "willReturnViaApi" : false,
               "willEmailToUser" : true
            },
            "verificationToken" : {
               "url" : "http://localhost:8888/verification/:verificationToken",
               "willReturnViaApi" : false,
               "willEmailToUser" : true
            }
         },
         "googleServices" : {
            "accountEmail" : "79976664605-7slpjhrtoub996dhiu5lb11l1073f3dk@developer.gserviceaccount.com",
            "keyPath" : "./google-services-key.pem",
            "fusionTables" : {
               "tableIds" : {
                  "shippingTableId" : "1TegIAfrrX5uvCvsu5DqPO_omWJEQQg-awX8mjsKt",
                  "calibrationTableId" : "1zsE1LDtwiXMFCK-PraGzIc1vczD5EYpA8Fm0T-IZ"
               }
            },
            "analytics" : {
               "enabled" : false,
               "propertyId" : "UA-60606644-1"
            }
         },
         "crazyEggAnalytics" : {
            "enabled" : false
         },
         "maps" : {
            "apiKey" : "AIzaSyDRg-ANz3nWQqLNFG9pQjZLXw45k84Eseo"
         },
         "database" : {
            "host" : "DATABASE_HOST",
            "port" : "3306",
            "database" : "DATABASE_NAME",
            "username" : "USERNAME",
            "password" : "PASSWORD",
            "pool" : {
               "connectionLimit" : 10
            }
         },
         "firmware" : {
            "message" : "NULL",
            "scalar" : 408,
            "version" : 8
         },
         "affiliateMarketing" : {
            "enabled" : false
         }
      });

module.exports = config;