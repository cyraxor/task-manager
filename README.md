# TaskManager Backend

## Setup

1. Install MongoDB on your enviroment 

2. Setup for .env variables
 **Setup values on /asset/config/.env_template and rename into `.env`**
 
 **PORT** - use your favorite Node.js API port.
 
 **SENDGRID_API_KEY** - register an account at [SendGrid](https://sendgrid.com/) and setup an API key 
 
 **SG_SENDER** - at SendGrid registered email address for API communication  **should not be your _SendGrid login address_**
 
 **MONGOOSE_URL** - path to the MongoDB *on local installation* `mongodb://127.0.0.1:27017/<DB_DOCUMENT>`
 
 **JWT_SECRET** - your personal passphase to salt the JWT token

# TaskManager Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Run in development mode 

Install **nodemon** local to the project `npm i nodemon` or globally `sudo npm i -g nodemon` if you want to use it with other Node.js projects
Run **Node.js API server** in development mode with `npm run dev-api` from project root folder
Run **complete MEAN stack server** in development mode with `npm run dev` from project root folder
