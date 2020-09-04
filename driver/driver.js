/*
Connects to the CAPS server as a socket.io client to the caps namespace
Listen for the pickup event coming in from the CAPS server
Simulate picking up the package
Wait 1.5 seconds
Log “picking up payload.id” to the console
emit an in-transit event to the CAPS server with the payload
Simulate delivering the package
Wait 3 seconds
emit a delivered event to the CAPS server with the payload
When running, the vendor and driver consoles should show their own logs. Additionally, the CAPS server should be logging everything. Your console output should look something like this:
*/

require('dotenv').config();
const io = require('socket.io-client');
const { Socket } = require('socket.io-client');

const capsChannel = io.connect('http://localhost:3003/caps');
capsChannel.emit('getall');

capsChannel.on('pickup', buffer =>{
    simulatePickup(buffer);
    capsChannel.emit('received', buffer.orderID);
});
function simulatePickup(object){
    setTimeout(()=>{
        console.log('picking up ', object.orderID)
      
        capsChannel.emit('in-transit', object);
        simulateDelivery(object);
    }, 1500);
}

    function simulateDelivery(object){
        setTimeout(()=>{
            capsChannel.emit('delivered', object);
            console.log('delivering order', object.orderID);
        }, 3000)
    }

