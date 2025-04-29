const express = require('express');
const { pid } = require('node:process');
const os = require('os');
const app = express();

function delay(duration) {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
        // Event loop is blocked
    }
}
app.get('/',(req,res) => {

    res.send(`Performance Examplee ${pid}`);
})

app.get('/timer',(req,res) => {
    delay(4000);
    res.send(`Ding ding dings ${pid}`);
})

}
