const { Socket } = require('socket.io-client');

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
    socket.on('in-transit', (payload)=>{
        console.log('got to intransit in caps make it in transit baby!', payload)

        caps.to('PigglyWiggly').emit('in-transit', payload);

    })
    socket.on('pickup', payload =>{
        // let string = JSON.parse(payload);
        let event = 'pickup';
        logEvent(event, payload);
        socket.emit('pickup', payload)
    });


});

function logEvent(event, string){
    // console.log(string, 'this is the string')
    const messageObject = JSON.parse(string);
    // console.log('this is the message object', messageObject)
    const payload = messageObject.payload;
    const time = new Date();
    console.log('EVENT', {event: event, time, messageObject})
}

// function deleteSocket(id){

//     return delete socketPool[id];
// }
//******************************************************************************************************************************** */
// const net = require('net');
// const server = net.createServer();
// let socketPool = {};
// const port = process.env.PORT || 3007;

// //this starts the server
// server.listen(port, () =>{
//     console.log('Server up and running on port', port);
// });

// server.on('connection', socket =>{
//     const id = `Socket-${Math.random()}`;
//     socketPool[id] = socket;
//     // console.log(socket, 'has made a connection to the socketPool along with', socketPool);
    

//     socket.on('data', buffer =>{
//         const raw = buffer.toString();
//         onMessageReceived(raw);

//     });
//     socket.on('close', () =>{
//         deleteSocket(socket.id);
//     });
// });

// function onMessageReceived(string){
//     logEvent(string);
//     broadcast(string);
// }
// function logEvent(string){
//     //console.log the big event
//     const messageObject = JSON.parse(string);
//     const eventName = messageObject.event;
//     const payload = messageObject.payload;
//     const time = new Date();
//     console.log('EVENT', {event: eventName, time, payload})
// }
// function broadcast(string){
//     for(let key in socketPool){
//         const socket = socketPool[key];
//         socket.write(string);
//     }
// }
// function deleteSocket(id){

//     return delete socketPool[id];
// }