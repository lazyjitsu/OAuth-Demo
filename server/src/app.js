const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const planetsRouter = require('./routes/planets/planets.router');
app.use(cors())

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static((path.join(__dirname,'..','public')))); // Serve static files from the 'public' directory



app.use(planetsRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

console.log('After planets router');
module.exports= app;
 