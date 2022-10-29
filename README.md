# udacity-second-project

This project has been created specially for udacity course using node js as backend and express, pg, typescript, eslint, prettier and jasmine

# Installation

- Run `npm i`         to install the dependencies in `package.json`
- Run `npm run build` to build the project
- Run `npm run start` to host the server on http://localhost:5000/

    - Other scripts
        - Run `npm run dev`            to host the server in development mode
        - Run `npm run watch`          to host the server in watch mode
        - Run `npm run test`           to test the server with jasmine-ts
        - Run `npm run migrate`        to migrate the databases in dev/test
        - Run `npm run migrate:reset`  to reset migrate in databases dev/test
        - Run `npm run lint`           to modify files from errors/warrnings with eslint
        - Run `npm run prettier`       to modify files to look better for reading

# Setting up database
- Connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a new user `CREATE USER store_user WITH PASSWORD '123456';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE store_dev;`
    - `CREATE DATABASE store_test;`
- Connect to the databases and grant all privileges to the user
    - Grant for dev database
        - `\c store_dev`
        - `GRANT ALL PRIVILEGES ON DATABASE store_dev TO store_user;`
    - Grant for test database
        - `\c store_test`
        - `GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;`

# Server Details
    SERVER HOST         : localhost
    SERVER PORT         : 5000

# Database Details
    DB_PORT             : 5432 (DEFAULT PORT)
    DB_NAME_DEVELOPMENT : store_dev
    DB_NAME_TEST        : store_test
    DB_USERNAME         : store_user
    DB_PASSWORD         : 123456

