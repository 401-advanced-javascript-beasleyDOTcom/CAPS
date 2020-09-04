'use strict' //demo stuff from class

const socket = require('socket.io-client').connect('http://localhost:3000');

// get all messages you missed
socket.emit('getall');

socket.on('hello-greeting', message =>{
    console.log('perd heard', message);
    socket.emit('received', payload);
});