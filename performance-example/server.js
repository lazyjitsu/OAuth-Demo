const express = require('express');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
        // Event loop is blocked
    }
}
app.get('/',(req,res) => {
    res.send('Performance Example');
})

app.get('/timer',(req,res) => {
    delay(9000);
    res.send('Ding ding ding');
})
app.listen(3300,() => {
    console.log('listening on 3300')
})