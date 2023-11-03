const express = require('express');

const app = express();

app.post('/chat', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader("Cache-Control", "no-cache, no-transform")
    // res.setHeader("Connection", 'keep-alive')

    sendStream(res);
    req.on('close', ()=>{
        console.log("closing");
        res.end('OK');
    })
    
})

const port = process.env.PORT || 6012;

let messages = ["hi", "there", "this", "is", "a", "test", "from", "ismails", "server", "sent", "events", "SSE is lightweight", "and it is", "fast"];

function sendStream(res) {
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            res.write("data: " + `${messages[i]} \n\n`);
            if (i == messages.length - 1) {
                console.log("last msg");
                res.end('OK');
            }
        }, i * 500);
    }

}

app.listen(port)
console.log(`Listening on ${port}`)