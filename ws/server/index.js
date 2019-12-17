const express = require('express');
const webSocket = require('ws');
const http = require('http');
var bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome')
});

const PORT = process.env.PORT || 9000

// app.listen returns a http server
const server = app.listen(PORT);

// we can also use node's built http lib to create and return a server
// using this method, we also still have to listen on a port
// const server = http.Server(app);
// server.listen(9000)

// you pass in a server when initialising a new websocket server
// you can also optionally add a path for it to listen on
const wss = new webSocket.Server({path: '/ws', server});

// the onheaders event is triggered when the client sends the initial request to connect
// when we look at it we can see the upgrade property asking the server to upgrade to websockets
wss.on('headers', (header,req)=> {
    // console.log(header);
});

// what does ws and req represent??
wss.on('connection', (ws,req)=>{
    // a web socket key is generated anytime a connection is to be made
    var id = req.headers['sec-websocket-key'];
    // console.log('id', req.url.replace('/?uuid=', ''))
    // const uuid = req.query.uuid

    // hw can i make use of ws.id
    console.log(ws)

    ws.send('Hello my first websocket message');

    ws.on('message', (msg) => {
        console.log(msg)
    });
});
