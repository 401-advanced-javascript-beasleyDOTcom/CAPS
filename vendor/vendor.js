/*
//Continue to declare your store id using .env
//Connects to the CAPS server as a socket.io client to the caps namespace
//Join a room named for your store
//Emit a join event to the caps namespace connection, with the payload being your store code
//Every .5 seconds, simulate a new customer order
//Create a payload object with your store name, order id, customer name, address
//Emit that message to the CAPS server with an event called pickup
//Listen for the delivered event coming in from the CAPS server
//Log “thank you for delivering payload.id” to the console
*/

require('dotenv').config();
const faker = require('faker');

const io = require('socket.io-client');
const capsChannel = io.connect('http://localhost:3003/caps');

capsChannel.emit('join', process.env.STORE);

function fakeData(){
    const storeInfo = {
        store: process.env.STORE,
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress()
        }
    return storeInfo;  
}
capsChannel.on('delivered', payload=>{
    console.log(`Thank you for delivering ${payload.orderID}`);
});

// setInterval( () =>{
// let chomp = fakeData();
//     capsChannel.emit('pickup', chomp);
// }, 5000)


// delivery = (Object.keys(request.bodyO.length && request.body) || { fake data object})