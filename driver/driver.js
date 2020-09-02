/*
Connect to the CAPS server
Listen for the data event coming in from the CAPS server
When data arrives, parse it (it should be JSON) and look for the event property and begin processing…
If the event is called pickup
Simulate picking up the package
Wait 1 second
Log “picking up id” to the console
Create a message object with the following keys:
event - ‘in-transit’
payload - the payload from the data object you just received
Write that message (as a string) to the CAPS server
Simulate delivering the package
Wait 3 seconds
Create a message object with the following keys:
event - ‘delivered’
payload - the payload from the data object you just received
Write that message (as a string) to the CAPS server
*/

require('dotenv').config();
const net = require('net');
const socket = new net.Socket();
const port = process.env.PORT || 3009;
const host = process.env.HOST || 'localYost';

//connect
socket.connect({ port: port, host: host}, () =>{
    console.log('Connected to the server on', host,':', port)
})

socket.on('data', buffer =>{
    let raw = buffer.toString();
    let object = JSON.parse(raw);
    if(object.event==='pickup'){
        simulatePickup(object);
    }
});

function simulatePickup(object){
    setTimeout(()=>{
        let newObject = {
            event: 'in-transit',
            payload: object.payload,
        };
        console.log('picking up ', newObject.payload.orderID)
        let stringVersion = JSON.stringify(newObject);
        socket.write(stringVersion);
        simulateDelivery(object);
    }, 1000);

    function simulateDelivery(object){
        setTimeout(()=>{
            let message = {
                event: 'delivered',
                payload: object.payload,
            };
            let stringVersion = JSON.stringify(message);
            socket.write(stringVersion);
        }, 3000)
    }
}
/*
Create a message object with the following keys:
event - ‘delivered’
payload - the payload from the data object you just received
Write that message (as a string) to the CAPS server
*/