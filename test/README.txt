To run these tests, do the following first:

0) Create the specksensor.com OAuth2 client in ESDR with the following values:

   {
   "displayName" : "Speck",
   "name" : "specksensor.com",
   "secret" : "Our planet is a lonely speck in the great enveloping cosmic dark.",
   "email" : "admin@specksensor.com",
   "isPublic" : true,
   "resetPasswordToken" : "http://localhost:8889/password-reset/:resetPasswordToken",
   "verificationToken" : "http://localhost:8889/verification/:verificationToken",
   }

1) In mysql, execute the following to create the test database and specksensor user:

      CREATE DATABASE IF NOT EXISTS speck_test;
      GRANT ALL PRIVILEGES ON speck_test.* To 'speck_test'@'localhost' IDENTIFIED BY 'password';
      GRANT SELECT,INSERT,UPDATE,DELETE,CREATE ON speck_test.* TO 'speck_test'@'localhost';

2) Run the ESDR server in test mode, like this:

      NODE_ENV=test npm start

   In test mode, the server runs on port 3001, so make sure you don't have anything else
   running on that port.

3) Run this server in test mode, like this:

      NODE_ENV=test npm start

   In test mode, the server runs on port 8889, so make sure you don't have anything else
   running on that port.

4) Run the tests:

      npm test