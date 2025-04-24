const express = require('express');
const cors = require('cors');
const app = express();
const planetsRouter = require('./routes/planets/planets.router');
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
// }));

// pass any incoming json data from body of incoming requests to the server
app.use(express.json({oriigin: 'http://localhost:3000'}));
console.log('Before planetss router');

app.get('/products/', cors(), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for a Single Route'});
  });



app.use(planetsRouter);
console.log('After planets router');
module.exports= app;
 