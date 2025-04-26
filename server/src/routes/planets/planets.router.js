const express = require('express');
var cors = require('cors')

const {httpGetAllPlanets} = require('./planets.controller');

const planetsRouter = express.Router();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// planetsRouter.get('/planets',cors(),httpGetAllPlanets);
planetsRouter.get('/',cors(),httpGetAllPlanets);

module.exports = planetsRouter;