const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

app.use(cors());
app.use(morgan('combined')); // Logging middleware

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static((path.join(__dirname,'..','public')))); // Serve static files from the 'public' directory

app.use('/planets',planetsRouter);
// we used '/launches' like this cause of the multiple '/launches' in the router, we didn't need to do
// it but jus leveraging express's ability to mount /launches and keep things shorter in the router

app.use('/launches',launchesRouter);
// Angular and Vue, any frontend that uses the HTML5 history API for routing and specifically the.
// Push state function to navigate from roads to roads can be served from Express.
// This is a catch-all route that serves the index.html file for any other routes not handled by the API.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

console.log('After planets router');
module.exports= app;
 