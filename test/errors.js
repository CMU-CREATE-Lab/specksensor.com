var assert = require('assert');
var should = require('should');
var ValidationError = require('../lib/errors').ValidationError;
var DatabaseError = require('../lib/errors').DatabaseError;
var DuplicateRecordError = require('../lib/errors').DuplicateRecordError;
var RemoteError = require('../lib/errors').RemoteError;
var httpStatus = require('http-status');

describe("Custom Error Classes", function() {
   describe("ValidationError", function() {
      var errorMessage = "oops, validation failed";
      var errorData = {foo : "bar", baz : {bat : "bif"}};
      var error1 = new ValidationError(errorData);
      var error2 = new ValidationError(errorData, errorMessage);

      it("Should be an instance of Error", function() {
         (error1 instanceof Error).should.be.true;
         (error2 instanceof Error).should.be.true;
      });

      it("Should be an instance of ValidationError", function() {
         (error1 instanceof ValidationError).should.be.true;
         (error2 instanceof ValidationError).should.be.true;
      });

      it("Should have the data property set", function() {
         // do a deep equal
         should(error1.data).eql(errorData);
         should(error2.data).eql(errorData);
      });

      it("Should have the message property set", function() {
         error1.should.have.property("message");
         error2.should.have.property("message", errorMessage);
      });
   });

   describe("DatabaseError", function() {
      var errorMessage = "oops, a database error";
      var errorData = {foo : "boo", baz : {bat : "blah"}};
      var error1 = new DatabaseError(errorData);
      var error2 = new DatabaseError(errorData, errorMessage);

      var nestedError = new Error("This is the nested error with a code");
      nestedError.code = "This is the code";
      var error3 = new DatabaseError(nestedError, errorMessage);

      it("Should be an instance of Error", function() {
         (error1 instanceof Error).should.be.true;
         (error2 instanceof Error).should.be.true;
         (error3 instanceof Error).should.be.true;
      });

      it("Should be an instance of DatabaseError", function() {
         (error1 instanceof DatabaseError).should.be.true;
         (error2 instanceof DatabaseError).should.be.true;
         (error3 instanceof DatabaseError).should.be.true;
      });

      it("Should have the data property set", function() {
         // do a deep equal
         should(error1.data).eql(errorData);
         should(error2.data).eql(errorData);
         should(error3.data).eql(nestedError);
      });

      it("Should have the message property set", function() {
         error1.should.have.property("message");
         error2.should.have.property("message", errorMessage);
         error3.should.have.property("message", errorMessage);
      });
   });

   describe("DuplicateRecordError", function() {
      var errorMessage = "oops, a duplicate record error";
      var errorData = {foo : "duplicate", baz : {bat : "record"}};
      var error1 = new DuplicateRecordError(errorData);
      var error2 = new DuplicateRecordError(errorData, errorMessage);

      var nestedError = new Error("This is the nested error with a code");
      nestedError.code = "This is the code";
      var error3 = new DuplicateRecordError(nestedError, errorMessage);

      it("Should be an instance of Error", function() {
         (error1 instanceof Error).should.be.true;
         (error2 instanceof Error).should.be.true;
         (error3 instanceof Error).should.be.true;
      });

      it("Should be an instance of DatabaseError", function() {
         (error1 instanceof DatabaseError).should.be.true;
         (error2 instanceof DatabaseError).should.be.true;
         (error3 instanceof DatabaseError).should.be.true;
      });

      it("Should be an instance of DuplicateRecordError", function() {
         (error1 instanceof DuplicateRecordError).should.be.true;
         (error2 instanceof DuplicateRecordError).should.be.true;
         (error3 instanceof DuplicateRecordError).should.be.true;
      });

      it("Should have the data property set", function() {
         // do a deep equal
         should(error1.data).eql(errorData);
         should(error2.data).eql(errorData);
         should(error3.data).eql(nestedError);
      });

      it("Should have the message property set", function() {
         error1.should.have.property("message");
         error2.should.have.property("message", errorMessage);
         error3.should.have.property("message", errorMessage);
      });
   });

   describe("RemoteError", function() {
      var jSend1 = {
         code : httpStatus.OK,
         status : "success",
         data : {foo : "bar", baz : {bat : "bif"}}
      };
      var jSend2 = {
         code : httpStatus.UNPROCESSABLE_ENTITY,
         status : "error",
         data : [
            { instanceContext : '#/password',
               resolutionScope : 'anon-schema://901fd9263ba7bddd565f4e680edd0a33481d19e2/#/properties/password',
               constraintName : 'minLength',
               constraintValue : 5,
               testedValue : 1,
               kind : 'StringValidationError' },
            { instanceContext : '#/email',
               resolutionScope : 'anon-schema://901fd9263ba7bddd565f4e680edd0a33481d19e2/#/properties/email',
               constraintName : 'format',
               constraintValue : 'email',
               testedValue : 'foobar',
               desc : 'not a valid email address',
               kind : 'FormatValidationError' }
         ],
         message : "Validation failure"
      };
      var jSend3 = {
         code : httpStatus.INTERNAL_SERVER_ERROR,
         status : "fail",
         data : {goodNews : "there's only one piece of bad news", badNews : "everything is broken, lost, and/or irreparably damaged"},
         message : "Something really nasty happened"
      };
      var error1 = new RemoteError(jSend1);
      var error2 = new RemoteError(jSend2);
      var error3 = new RemoteError(jSend3);

      it("Should be an instance of Error", function() {
         (error1 instanceof Error).should.be.true;
         (error2 instanceof Error).should.be.true;
         (error3 instanceof Error).should.be.true;
      });

      it("Should be an instance of RemoteError", function() {
         (error1 instanceof RemoteError).should.be.true;
         (error2 instanceof RemoteError).should.be.true;
         (error3 instanceof RemoteError).should.be.true;
      });

      it("Should have the data property set", function() {
         // do a deep equal
         should(error1.data).eql(jSend1);
         should(error2.data).eql(jSend2);
         should(error3.data).eql(jSend3);
      });
   });

});
