
/*
//Start a socket.io server on a designated port
//Create and accept connections on a namespace called caps
// Within the namespace:
// Monitor the ‘join’ event.
Each vendor will have their own “room” so that they only get their own delivery notifications
Monitor the correct general events
pickup, in-transit, delivered
Broadcast the events and payload back out to the appropriate clients in the caps namespace
pickup can go out to all sockets (broadcast it) so that the drivers can hear it
in-transit and delivered are meant to be heard only by the right vendor
Emit those messages and payload only to the room (vendor) for which the message was intended
*/
require('dotenv').config();
const io = require('socket.io')(process.env.PORT || 3000);
const caps = io.of('/caps'); // this is a namespace

caps.on('connection', socket =>{
    console.log('connected with', socket.id);
    socket.on('join', room =>{
        console.log('joined', room);
        socket.join(room);
        });
    socket.on('pickup', payload =>{
        // let string = JSON.parse(payload);
        caps.emit('pickup', payload);
        console.log('EVENT', payload);
    });        
    socket.on('in-transit', (payload)=>{
        console.log('got to intransit in caps make it in transit baby!', payload)

        caps.to(process.env.STORE).emit('in-transit', payload);

    })

    socket.on('delivered', (payload)=>{
        caps.to(process.env.STORE).emit('delivered', payload);
    });
});

