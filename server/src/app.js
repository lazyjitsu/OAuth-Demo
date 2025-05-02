const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const morgan = require('morgan');


const {v1Router} = require('./routes/api-v1')

app.use(cors());
app.use(morgan('combined')); // Logging middleware

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static((path.join(__dirname,'..','public')))); // Serve static files from the 'public' directory

app.use('/v1',v1Router);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

console.log('After planets router');
module.exports= app;
 