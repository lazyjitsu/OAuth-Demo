const express = require('express')
const https = require('https');
const path = require('path');
const fs = require('fs');

PORT = 2000;

const app = express();

 
app.get('/secret',(req,res) => {
    res.send("Security settings")
})

app.get('/',(req,res) => {
    // res.send("What up");
    res.sendFile(path.join(__dirname,'public','index.html'))
    console.log("hit")
});


const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
},app);

server.listen(PORT,() => {
    console.log(`Listening on ${PORT}`)
})