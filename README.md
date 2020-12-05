# React-Express Todo

## Description
A simple todo app created using react-redux, express-mongo.

## Dependencies:
  ### 1. Node.js (12+) [download](https://nodejs.org/en/download/)
  ### 2. Mongo (v4) [download](https://www.mongodb.com/try/download/community)
  ### 3. NPM (Compatible with given Node version) []
  ### 3. Yarn

## Directory Structure:
- ### server:
  - #### dist: containing files transpiled by babel (from es8 to commonJS
  - #### src: containing un-transpiled files used in development
  - #### storage:
  - - #### logs: contains logs.
  - #### .babelrc: contains babel settings
  - #### .env.example: a sample .env file that can be duplicated to set up application
  - #### .eslintrc.json: eslint configs
  - #### package.json: containing dependencies and other necessary details about the package
- ### client:
  - #### build: containing files transpiled by babel (from es8 to commonJS)
  - #### public: containing files accesible publicly including index.html
  - #### src: containing un-transpiled files used in development
  - #### .env.example: a sample .env file that can be duplicated to set up application
  - #### package.json: containing dependencies and other necessary details about the package


## Project Setup
- Create a database in your mongo instance.
- Copy `.env.example` to `.env` in both `client` and `server` directories and change it according to your needs.
- perform a `npm install` in `server` and `yarn install` in `client` directories to install dependencies of both projects
- execute `npm run dev` in the `server` directory to start the backend server
- execute `npm run start` in `client` directory to start the frontend server
