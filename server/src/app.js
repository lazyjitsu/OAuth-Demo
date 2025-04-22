const express = require('express');
const cors = require('cors');
const app = express();
const planetsRouter = require('./routes/planets/planets.router');

app.use(cors({
    origin: 'http://localhost:3000',
  }));

// pass any incoming json data from body of incoming requests to the server
app.use(express.json());
console.log('Before planets router');
app.use(planetsRouter);
console.log('After planets router');
module.exports= app;
 