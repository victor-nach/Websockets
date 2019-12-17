const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();

server = app.listen(PORT);

const io = socketIO(server);

// the connection event is sent to the server whenever a client connects 
io.on('connection', socket => {
    // For every successful client connection to the server we get a socket object in the callback function
    // this socket object represents a line of connection between the server and the particular client

    // For every socket that connects to the client, a new id is generated for them
    console.log('new client is connected with id:', socket.id)

    // we can then also send events to the client using the emit method (custom events)
    socket.emit('welcome', "Welcome to this socket.io server");
    // The client also has to listen for the exact event we just sent
});
