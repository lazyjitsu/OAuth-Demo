const express = require('express');


const {httpGetAllLaunches,httpAddNewLaunch} = require('./launches.controller');
const launchesRouter = express.Router();


// '/' means '/launches/' due to app.js's app.use('/launches', launchesRouter) line
launchesRouter.get('/',httpGetAllLaunches);
launchesRouter.post('/',httpAddNewLaunch);


module.exports = launchesRouter;