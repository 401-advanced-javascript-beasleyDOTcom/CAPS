'use strict';
const uuid = require('uuid').v4(); // npm i uuid
const io = require('socket.io')(3000);

const queue = {
    hello:{

    }
};


io.on('connection', socket =>{
    console.log('connection made');

    socket.on('hello', message =>{
        console.log('hello message received', message);

        const id = uuidv4();
        queue.hello[id] = message;
        const payload = {id, message};

        io.emit('hello-greeting', payload);
 // or: socket.broadcast.emit('hello-greeting, payload);
    });
    socket.on('getall', ()=>{
        console.log('heard getall')
        // re emit everything that is in queue
       
        for( let id in queue.hello){
            const message = queue.hello[id];
            const payload = {id, message};
            socket.emit('hello-greeting', payload);
        }
    });
    socket.on('received', payload =>{
        let id = payload.id;

        delete queue.hello[id];

        console.log(queue.hello);
    })
});