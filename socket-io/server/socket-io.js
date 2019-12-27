const socketIO = require('socket.io');

const io = socketIO();

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

    // the handsh
    const { name, court } = socket.handshake.query;
    console.log( name, court );

    // you can use event names which are the same in other namespaces 
    socket.emit('welcome', 'welcome to the games namespace')

    // JOINING ROOMS
    // we can use the events method to allow sockets join rooms
    socket.on('joinRoom', court => {

        // for the first person that tries to join this room, if it doesn't exist, that room is created
        socket.join(court, (err) => {
            if (err) console.log('could not join room')
            else console.log(`successfully joined ${court}`)
        })
    })

    // or we can also join a room automatially on connection 
    // for the first person that tries to join this room, if it doesn't exist, that room is created
    socket.join(court, (err) => {
        if (err) console.log('could not join room')
        else console.log(`${name} successfully joined ${court}`);
        io.of('/games').in(court).emit('room', `welcome to room${court}`);
    })
});

module.exports = io;