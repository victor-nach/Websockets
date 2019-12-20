const express = require('express');
// const socketIO = require('socket.io');
const io = require('./socket-io');

const PORT = process.env.PORT || 3000;

const app = express();

server = app.listen(PORT);

io.attach(server);

module.exports = app;

