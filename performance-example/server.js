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

    res.send(`Performance Examplees ${pid}`);
})

app.get('/timer',(req,res) => {
    delay(4000);
    res.send(`Beep beep ${pid}`);
})

app.listen(3300, () => {
    console.log('Listening on 3300')
})
