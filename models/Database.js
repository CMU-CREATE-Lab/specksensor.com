var mysql = require('mysql');
var flow = require('nimble');

var DatabaseHelper = require("./DatabaseHelper");
var Users = require('./Users.js');
var ActiveSpecks = require('./ActiveSpecks.js');
var PM25Stations = require('./PM25Stations.js');

var config = require('../config');
var log = require('log4js').getLogger('specksensor:models:database');

module.exports = {
   create : function(callback) {
      log.info("Initializing database '" + config.get("database:database") + "'...");

      var errors = [];
      var hasErrors = function() {
         return errors.length > 0
      };

      var databaseHelper = null;
      var db = {
         users : null,
         activeSpecks : null,
         pm25Stations : null
      };

      // do the database initialization in serial order, since some tables have foreign keys to other tables
      flow.series(
            [
               // make sure the database exists
               function(done) {
                  log.info("1) Ensuring the database exists.");
                  var conn = mysql.createConnection({
                                                       host : config.get("database:host"),
                                                       port : config.get("database:port"),
                                                       user : config.get("database:username"),
                                                       password : config.get("database:password")
                                                    });

                  if (conn) {
                     conn.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
                                [config.get("database:database")],
                                function(err1, rows) {
                                   if (err1) {
                                      errors.push(new Error("Error trying to query for the database: " + err1));
                                   }
                                   else {
                                      if (!(rows && rows.length > 0 && rows[0]['SCHEMA_NAME'] == config.get("database:database"))) {
                                         errors.push(new Error("Could not find the database."));
                                      }
                                   }

                                   // close the connection
                                   conn.end(function(err2) {
                                      if (err2) {
                                         errors.push(new Error("Error trying to close the connection after querying for the database: " + err2));
                                      }
                                      done();
                                   });
                                });
                  }
                  else {
                     errors.push(new Error("Failed to get a connection to the database."));
                     done();
                  }
               },

               // create the connection pool
               function(done) {
                  if (!hasErrors()) {
                     log.info("2) Creating the connection pool.");
                     var pool = mysql.createPool({
                                                    connectionLimit : config.get("database:pool:connectionLimit"),
                                                    host : config.get("database:host"),
                                                    port : config.get("database:port"),
                                                    database : config.get("database:database"),
                                                    user : config.get("database:username"),
                                                    password : config.get("database:password")
                                                 });
                     databaseHelper = new DatabaseHelper(pool);
                  }
                  done();
               },

               // create the Users table, if necessary
               function(done) {
                  if (!hasErrors()) {
                     log.info("3) Ensuring the Users table exists.");
                     var users = new Users(databaseHelper);
                     users.initialize(function(err) {
                        if (err) {
                           errors.push(err)
                        }
                        else {
                           db.users = users;
                        }

                        done();
                     });
                  }
                  else {
                     done();
                  }
               },

               // create the ActiveSpecks table, if necessary
               function(done) {
                  if (!hasErrors()) {
                     log.info("4) Ensuring the ActiveSpecks table exists.");
                     var activeSpecks = new ActiveSpecks(databaseHelper);
                     activeSpecks.initialize(function(err) {
                        if (err) {
                           errors.push(err)
                        }
                        else {
                           db.activeSpecks = activeSpecks;
                        }

                        done();
                     });
                  }
                  else {
                     done();
                  }
               },

               // create the PM25Stations table, if necessary
               function(done) {
                  if (!hasErrors()) {
                     log.info("5) Ensuring the PM25Stations table exists.");
                     var pm25Stations = new PM25Stations(databaseHelper);
                     pm25Stations.initialize(function(err) {
                        if (err) {
                           errors.push(err)
                        }
                        else {
                           db.pm25Stations = pm25Stations;
                        }

                        done();
                     });
                  }
                  else {
                     done();
                  }
               }

            ],
            function() {
               if (hasErrors()) {
                  log.error("The following error(s) occurred during database initialization:");
                  errors.forEach(function(e) {
                     log.error("   " + e);
                  });

                  var error = new Error("Error(s) occurred during database initialization. See errors property in this object.");
                  error.errors = errors;
                  callback(error, null);
               }
               else {
                  log.info("Database initialization complete!");
                  callback(null, db);
               }
            }
      );
   }
};