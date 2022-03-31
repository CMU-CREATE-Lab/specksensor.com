var assert = require('assert');
var should = require('should');
var agent = require('supertest');
var mysql = require('mysql');
var config = require('../config');
var flow = require('nimble');
var Database = require("../models/Database");
var esdr = require('../lib/esdr');
var ValidationError = require('../lib/errors').ValidationError;
var RemoteError = require('../lib/errors').RemoteError;
var DuplicateRecordError = require('../lib/errors').DuplicateRecordError;
var httpStatus = require('http-status');
var log = require('log4js').getLogger('specksensor:test');

describe("specksensor.com", function() {
   var url = config.get("server:url");
   var userCounter = 0;
   var shallowClone = function(obj) {
      if (obj) {
         var clone = {};
         Object.keys(obj).forEach(function(key) {
            clone[key] = obj[key];
         });
         return clone;
      }
      return obj;
   };
   var createTestUser = function() {
      return {
         email : "tackaberry_" + new Date().getTime() + "_" + (userCounter++) + "@mcadoo.com",
         password : "Tackaberry McAdoo is a fantastic name",
         displayName : "Tackaberry McAdoo"
      };
   };
   var db = null;
   var testUsers = {};

   var pool = mysql.createPool({
                                  connectionLimit : config.get("database:pool:connectionLimit"),
                                  host : config.get("database:host"),
                                  port : config.get("database:port"),
                                  database : config.get("database:database"),
                                  user : config.get("database:username"),
                                  password : config.get("database:password")
                               });

   // make sure the database tables exist and, if so, wipe the tables clean
   before(function(initDone) {
      // make sure the client exists in ESDR
      esdr.findClient(config.get("client:name"),
                      function(err, result) {
                         if (err) {
                            throw new Error("Error occurred while finding the Speck client in ESDR: " + JSON.stringify(err, null, 3));
                         }
                         else {
                            log.info("The client exists in ESDR.");
                         }

                         Database.create(function(err, theDatabase) {
                            if (err) {
                               throw err;
                            }
                            db = theDatabase;
                            pool.getConnection(function(err, connection) {
                               if (err) {
                                  throw err;
                               }

                               flow.series([
                                              function(done) {
                                                 connection.query("DELETE FROM sessions", function(err) {
                                                    if (err) {
                                                       throw err;
                                                    }

                                                    done();
                                                 });
                                              },
                                              function(done) {
                                                 connection.query("DELETE FROM Users", function(err) {
                                                    if (err) {
                                                       throw err;
                                                    }

                                                    done();
                                                 });
                                              }
                                           ],
                                           function() {
                                              initDone();
                                           });
                            });
                         });
                      });
   });

   describe("REST API", function() {
      describe("Users", function() {

         testUsers.testUser1 = createTestUser();
         testUsers.testUser2 = createTestUser();
         var verificationTokens = {};

         describe("create", function() {

            it("Should be able to create a new user", function(done) {
               agent(url)
                     .post("/api/v1/users")
                     .send(testUsers.testUser1)
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.CREATED);
                        res.body.should.have.property('code', httpStatus.CREATED);
                        res.body.should.have.property('status', 'success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('email', testUsers.testUser1.email);
                        res.body.data.should.have.property('displayName', testUsers.testUser1.displayName);
                        res.body.data.should.have.property('verificationToken');

                        // remember the verification token so we can verify this user
                        verificationTokens[testUsers.testUser1.email] = res.body.data.verificationToken;
                        done();
                     });
            });

            it("Should not be able to create the same user again", function(done) {
               agent(url)
                     .post("/api/v1/users")
                     .send(testUsers.testUser1)
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.CONFLICT);
                        res.body.should.have.property('code', httpStatus.CONFLICT);
                        res.body.should.have.property('status', 'error');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('email', testUsers.testUser1.email);

                        done();
                     });
            });

            it("Should be able to create a different user", function(done) {
               agent(url)
                     .post("/api/v1/users")
                     .send(testUsers.testUser2)
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.CREATED);
                        res.body.should.have.property('code', httpStatus.CREATED);
                        res.body.should.have.property('status', 'success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('email', testUsers.testUser2.email);
                        res.body.data.should.have.property('displayName', testUsers.testUser2.displayName);
                        res.body.data.should.have.property('verificationToken');

                        // remember the verification token so we can verify this user
                        verificationTokens[testUsers.testUser2.email] = res.body.data.verificationToken;
                        done();
                     });
            });

            it("Should fail to create an invalid user", function(done) {
               agent(url)
                     .post("/api/v1/users")
                     .send({
                              email : "foobar",       // not a valid email address
                              password : "X"          // too short
                           })
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }
                        res.should.have.property('status', httpStatus.UNPROCESSABLE_ENTITY);
                        res.body.should.have.property('code', httpStatus.UNPROCESSABLE_ENTITY);
                        res.body.should.have.property('status', 'error');
                        res.body.should.have.property('data');
                        res.body.data.errors.should.have.length(2);
                        res.body.data.errors[0].should.have.property('keyword', 'format');
                        res.body.data.errors[0].should.have.property('dataPath', '.email');
                        res.body.data.errors[0].should.have.property('schemaPath', '#/properties/email/format');
                        res.body.data.errors[1].should.have.property('keyword', 'minLength');
                        res.body.data.errors[1].should.have.property('dataPath', '.password');
                        res.body.data.errors[1].should.have.property('schemaPath', '#/properties/password/minLength');

                        done();
                     });
            });

         });   // end Create

         describe("verification", function() {
            it("Should be able to verify a new user", function(done) {
               agent(url)
                     .put("/api/v1/user-verification")
                     .send({ token : verificationTokens[testUsers.testUser1.email] })
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.OK);
                        res.body.should.have.property('code', httpStatus.OK);
                        res.body.should.have.property('status', 'success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('isVerified', true);

                        done();
                     });
            });

            it("Should be able to verify the same user again", function(done) {
               agent(url)
                     .put("/api/v1/user-verification")
                     .send({ token : verificationTokens[testUsers.testUser1.email] })
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.OK);
                        res.body.should.have.property('code', httpStatus.OK);
                        res.body.should.have.property('status', 'success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('isVerified', true);

                        done();
                     });
            });

            it("Should fail to verify with a bogus verification token", function(done) {
               agent(url)
                     .put("/api/v1/user-verification")
                     .send({ token : "bogus" })
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.BAD_REQUEST);
                        res.body.should.have.property('code', httpStatus.BAD_REQUEST);
                        res.body.should.have.property('status', 'error');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('isVerified', false);

                        done();
                     });
            });

            it("Should fail to verify with a missing verification token", function(done) {
               agent(url)
                     .put("/api/v1/user-verification")
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.UNPROCESSABLE_ENTITY);
                        res.body.should.have.property('code', httpStatus.UNPROCESSABLE_ENTITY);
                        res.body.should.have.property('status', 'error');
                        res.body.should.have.property('data', null);
                        done();
                     });
            });

         });   // end Verification

         describe("login", function() {

            it("Should be able to login an already-verified user", function(done) {
               agent(url)
                     .post("/login")
                     .send({ email : testUsers.testUser1.email, password : testUsers.testUser1.password })
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.OK);
                        res.body.should.have.property('code', httpStatus.OK);
                        res.body.should.have.property('status', 'success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('accessToken');
                        res.body.data.should.have.property('accessTokenExpiration');

                        done();
                     });
            });

            it("Should fail to login an unverified user", function(done) {
               agent(url)
                     .post("/login")
                     .send({ email : testUsers.testUser2.email, password : testUsers.testUser2.password })
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.UNAUTHORIZED);
                        res.body.should.have.property('code', httpStatus.UNAUTHORIZED);
                        res.body.should.have.property('status', 'error');
                        res.body.should.have.property('data', null);

                        done();
                     });
            });

            it("Should be able to login after verifying that user", function(done) {
               agent(url)
                     .put("/api/v1/user-verification")
                     .send({ token : verificationTokens[testUsers.testUser2.email] })
                     .end(function(err, res) {
                        if (err) {
                           return done(err);
                        }

                        res.should.have.property('status', httpStatus.OK);
                        res.body.should.have.property('code', httpStatus.OK);
                        res.body.should.have.property('status', 'success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('isVerified', true);

                        agent(url)
                              .post("/login")
                              .send({ email : testUsers.testUser2.email, password : testUsers.testUser2.password })
                              .end(function(err, res) {
                                 if (err) {
                                    return done(err);
                                 }

                                 res.should.have.property('status', httpStatus.OK);
                                 res.body.should.have.property('code', httpStatus.OK);
                                 res.body.should.have.property('status', 'success');
                                 res.body.should.have.property('data');
                                 res.body.data.should.have.property('accessToken');
                                 res.body.data.should.have.property('accessTokenExpiration');

                                 done();
                              });
                     });
            });

            // TODO: get session cookie, access protected resource with that cookie (show that you can't
            // access the resource before logging in, but can access it afterwards)

         });   // end Login

      });   // end Users
   });

   describe("Database", function() {
      var testUser = createTestUser();

      describe("Users", function() {
         describe("create", function() {

            var verificationTokens = {};

            it("Should be able to create a new user", function(done) {
               db.users.create(testUser, function(err, result) {
                  if (err) {
                     return done(err);
                  }
                  result.should.have.property("id");
                  // we're running in test mode, so the verification
                  // token is passed back rather than emailed
                  result.should.have.property("verificationToken");
                  verificationTokens.testUser = result.verificationToken;

                  done();
               });
            });

            it("Should fail if we attempt to register the same user again", function(done) {
               db.users.create(testUser, function(err, result) {
                  (typeof result === 'undefined' || result == null).should.be.true;
                  (err != null).should.be.true;
                  (err instanceof DuplicateRecordError).should.be.true;
                  err.data.should.have.property("email", testUser.email);
                  done();
               });
            });

            it("Should fail if we attempt to register the a user with the same email, but different password", function(done) {
               db.users.create({
                                  email : testUser.email,
                                  password : testUser.password + " this makes it different",
                                  displayName : testUser.displayName
                               },
                               function(err, result) {
                                  (typeof result === 'undefined' || result == null).should.be.true;
                                  (err != null).should.be.true;
                                  (err instanceof DuplicateRecordError).should.be.true;
                                  err.data.should.have.property("email", testUser.email);
                                  done();
                               });
            });

            it("Should fail to create an invalid user", function(done) {
               db.users.create({
                                  email : "foobar",       // not a valid email address
                                  password : "X"          // too short
                               },
                               function(err, result) {
                                  (typeof result === 'undefined' || result == null).should.be.true;
                                  (err != null).should.be.true;
                                  (err instanceof ValidationError).should.be.true;
                                  err.should.have.property("data");
                                  err.data.should.have.property("errors");
                                  err.data.errors.should.have.length(2);

                                  done();
                               });
            });

         });
      });
   });
})
;
