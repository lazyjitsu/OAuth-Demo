const express = require('express');

const {httpGetAllLaunches,httpAddNewLaunch,httpAbortLaunch} = require('./launches.controller');
// const { httpAbortLaunch } = require('../../../../client/src/hooks/requests');
const launchesRouter = express.Router();

// '/' means '/launches/' due to app.js's app.use('/launches', launchesRouter) line
launchesRouter.get('/',httpGetAllLaunches);
launchesRouter.post('/',httpAddNewLaunch);
launchesRouter.delete('/:id',httpAbortLaunch);
module.exports = launchesRouter;