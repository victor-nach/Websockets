const express = require('express');
const webSocket = require('ws');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome')
});

const PORT = process.env.PORT || 9000
const server = app.listen(PORT);

// you pass in a server when initialising a new websocket server
// you can also optionally add a path for it to listen on
const wss = new webSocket.Server({path: '/ws', server});

wss.on('headers', (header,req)=> {
    console.log(header);
    // console.log(req, 'helllo')
});

wss.on('connection', (ws,req)=>{
    ws.send('Hello my first websocket message');
    ws.on('message', (msg) => {
        console.log(msg)
    });
});
