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


// USING NAMESPACES

// we can use namespaces to create a form of seperation that act like groups
// so from the beginning the clients can either connect to one namespace or the other

// we use the io.of() method to declare a new namespace
io.of('/games').on('connection', socket => {
    console.log('new client connected to the games namespace with id: ', socket.id);

    // you can use event names which are the same in other namespaces 
    socket.emit('welcome', 'welcome to the games namespace')

    // JOINING ROOMS
    // we can use the events method to allow sockets join rooms
    socket.on('joinRoom', room => {

        // for the first person that tries to join this room, if it doesn't exist, that room is created
        socket.join(room)
    })
});