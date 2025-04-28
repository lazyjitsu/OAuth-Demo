const express = require('express');
const cluster = require('cluster');
const { pid } = require('node:process');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
        // Event loop is blocked
    }
}
app.get('/',(req,res) => {
    // if a request takes 10ms and yours is going to take 10ms, that's 20ms+ if its being blocked
    // commmon activities/requests
    // JSON.stringify({}) => "{}"
    // JSON.parse("{}") => {}
    // [1,23,42,3,3].sort()
    // crypt libraries can also consume space. Some crypts run long by design that is, to decrypt/encrypt, hash w/long hashes etc..
    // its the reverse where we want a hacker to take a while. We don't want them checking 10s of millions of passwords every second lol

    // For real life apps we want to keep our response times down to 100 or 200 milliseconds 
    res.send(`Performance Examplee ${pid}`);
})

app.get('/timer',(req,res) => {
    delay(4000);
    p = process.id
    res.send(`Ding ding dings ${pid}`);
})
console.log(process.id)
if (cluster.isMaster) {
    // runs only once during startup e.g. `node server.js`
    console.log('Master has been started');
    cluster.fork();
    cluster.fork();
    console.log("Started two processes")
} else {
    app.listen(3300,() => {
        console.log('listening on 3300')
    })
    console.log('Worker process started!!');
}
