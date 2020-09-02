/*
Creates a pool of connected clients
Accept inbound TCP connections on a declared port
On new connections, add the client to the connection pool
On incoming data from a client
Read and parse the incoming data/payload
Verify that the data is legitimate
Is it a JSON object with both an event and payload properties?
If the payload is ok, broadcast the raw data back out to each of the other connected clients
*/
require('dotenv').config();
const net = require('net');
const server = net.createServer();
let socketPool = {};
const port = process.env.PORT || 3007;

//this starts the server
server.listen(port, () =>{
    console.log('Server up and running on port', port);
});

server.on('connection', socket =>{
    const id = `Socket-${Math.random()}`;
    socketPool[id] = socket;
    // console.log(socket, 'has made a connection to the socketPool along with', socketPool);
    

    socket.on('data', buffer =>{
        const raw = buffer.toString();
        onMessageReceived(raw);

    });
    socket.on('close', () =>{
        deleteSocket(socket.id);
    });
});

function onMessageReceived(string){
    logEvent(string);
    broadcast(string);
}
function logEvent(string){
    //console.log the big event
    const messageObject = JSON.parse(string);
    const eventName = messageObject.event;
    const payload = messageObject.payload;
    const time = new Date();
    console.log('EVENT', {event: eventName, time, payload})
}
function broadcast(string){
    for(let key in socketPool){
        const socket = socketPool[key];
        socket.write(string);
    }
}
function deleteSocket(id){

    return delete socketPool[id];
}