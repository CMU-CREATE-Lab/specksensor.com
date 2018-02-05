# specksensor.com


The specksensor.com web site.

## Setup

1. Install the module dependencies:

        npm install
    
2. Install ESDR.

3. Do the following to create the development MySQL database and user:

        CREATE DATABASE IF NOT EXISTS speck_dev;
        GRANT ALL PRIVILEGES ON speck_dev.* To 'speck_dev'@'localhost' IDENTIFIED BY 'password';
        GRANT SELECT,INSERT,UPDATE,DELETE,CREATE ON speck_dev.* TO 'speck_dev'@'localhost';

    If you choose to change the password, make sure it matches the password in `config-dev.json`.

4. If you want to be able to run the tests, do the following to create the test database and user:

        CREATE DATABASE IF NOT EXISTS speck_test;
        GRANT ALL PRIVILEGES ON speck_test.* To 'speck_test'@'localhost' IDENTIFIED BY 'password';
        GRANT SELECT,INSERT,UPDATE,DELETE,CREATE ON speck_test.* TO 'speck_test'@'localhost';

    If you choose to change the password, make sure it matches the password in `config-test.json`.

5. If running in production, dow the following:

    1. Create the `config-prod.json` file. Just copy from the other config, but you need only include the parts that differ from `config.js`.

    2. Do the following to create the production database and user:

            CREATE DATABASE IF NOT EXISTS speck_prod;
            GRANT ALL PRIVILEGES ON speck_prod.* To 'speck_prod'@'localhost' IDENTIFIED BY 'USE_A_GOOD_PASSWORD_HERE';
            GRANT SELECT,INSERT,UPDATE,DELETE,CREATE ON speck_prod.* TO 'speck_prod'@'localhost';

        Again, make sure the user and password you specify matches those in `config-prod.json`.

6. If necessary, create the specksensor.com client and Speck product in ESDR.  The specksensor.com server verifies that they exist upon startup and will fail to start if they aren't found.

7. You'll now need to make sure the appropriate OAuth2 client exists in ESDR, for whatever environment you're running under.  

    1. Log into ESDR and the go to the Clients tab.
    2. Create the client as follows for whatever environment you're targeting.  Look in the appropriate `config-ENV.json` file for the Client Secret:
    
       |                        | dev                                                       | test                                                     | prod                                                           |
       | -----------------------| --------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- |
       | **Display Name**       | Speck                                                     | Speck                                                    | Speck                                                          |  
       | **Client ID**          | specksensor.com                                           | specksensor.com                                          | specksensor.com                                                |
       | **Client Secret**      | \[see `config-dev.json`\]                                 | \[see `config-test.json`\]                               | \[see `config-prod.json`\]                                     |
       | **Email Address**      | admin@specksensor.com                                     | admin@specksensor.com                                    | admin@specksensor.com                                          |
       | **Verification URL**   | http://localhost:8888/verification/:verificationToken     | http://localhost:8889/verification/:verificationToken    | https://www.specksensor.com/verification/:verificationToken    |
       | **Reset Password URL** | http://localhost:8888/password-reset/:resetPasswordToken  | http://localhost:8889/password-reset/:resetPasswordToken | https://www.specksensor.com/password-reset/:resetPasswordToken |
       | **Visibility**         | Public                                                    | Public                                                   | Public                                                         |

8. Now create the Speck product in ESDR.  You'll either need to do the OAuth2 dance to get an access token, or just look in the database and find the token there.  I think the latter is way easier, so these instructions will do that.
    1. Log into the ESDR web site.  This creates the OAuth2 token you'll need.
    2. Look in the MySQL Tokens table and find the record for your user.
    3. In the root directory of this repository, run one of the following curl commands (making sure to replace `YOUR_ACCESS_TOKEN` with your access token), depending on the environment you're targeting:
    
       **Dev**:
       
           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3000/api/v1/products -d @./etc/create_products/speck_product.json
           
       **Test**:
       
           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3001/api/v1/products -d @./etc/create_products/speck_product.json

       **Prod**:

           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://esdr.cmucreatelab.org/api/v1/products -d @./etc/create_products/speck_product.json

    4. You should get a response like this:
    
       ```
       {"code":201,"status":"success","data":{"id":1,"name":"speck_v1"}}
       ```
           
9. If you want to also see Honeybee Dylos devices in your instance of the site, then you'll also need to create the Honeybee Dylos product in ESDR.  As in the previous step, you'll need your OAuth2 access token.
    1. In the root directory of this repository, run one of the following curl commands (making sure to replace `YOUR_ACCESS_TOKEN` with your access token), depending on the environment you're targeting:
    
       **Dev**:
       
           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3000/api/v1/products -d @./etc/create_products/honeybee_dylos_product.json
           
       **Test**:
       
           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3001/api/v1/products -d @./etc/create_products/honeybee_dylos_product.json

       **Prod**:

           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://esdr.cmucreatelab.org/api/v1/products -d @./etc/create_products/honeybee_dylos_product.json

    2. You should get a response like this:
    
       ```
       {"code":201,"status":"success","data":{"id":2,"name":"honeybee_dylos"}}
       ```
           
10. If you want to also see generic Honeybee devices in your instance of the site, then you'll also need to create the Honeybee product in ESDR.  As in the previous step, you'll need your OAuth2 access token.
    1. In the root directory of this repository, run one of the following curl commands (making sure to replace `YOUR_ACCESS_TOKEN` with your access token), depending on the environment you're targeting:
    
       **Dev**:
       
           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3000/api/v1/products -d @./etc/create_products/honeybee_product.json
           
       **Test**:
       
           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3001/api/v1/products -d @./etc/create_products/honeybee_product.json

       **Prod**:

           curl -X POST -H "Content-Type:application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://esdr.cmucreatelab.org/api/v1/products -d @./etc/create_products/honeybee_product.json

    2. You should get a response like this:
    
       ```
       {"code":201,"status":"success","data":{"id":3,"name":"honeybee"}}
       ```
           
## Run

To run the server in development mode, do any of the following:

    npm start
    NODE_ENV=dev npm start
    NODE_ENV=development npm start
    
To run the server in test mode, do:

    NODE_ENV=test npm start

To run the server in production mode, do either of the following:

    NODE_ENV=prod npm start
    NODE_ENV=production npm start

## Development

To generate the CSS from the SCSS template, do:

    npm run-script gen-css

To compile the handlebars templates, do:

    npm run-script gen-handlebars
