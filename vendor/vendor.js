/*
Use .env to set your store name
Connect to the CAPS server
Every 5 seconds, simulate a new customer order
Create an order object with your store name, order id, customer name, address
HINT: Have some fun by using the faker library to make up phony information
Create a message object with the following keys:
event - ‘pickup’
payload - the order object you created in the above step
Write that message (as a string) to the CAPS server
Listen for the data event coming in from the CAPS server
When data arrives, parse it (it should be JSON) and look for the event property
If the event is called delivered
Log “thank you for delivering id” to the console
Ignore any data that specifies a different event
*/

require('dotenv').config();
const faker = require('faker');
const net = require('net');
const socket = new net.Socket();
const port = process.env.PORT || 3009;
const host = process.env.HOST || 'localYost';


socket.connect({port: port, host:host}, ()=>{
    console.log(`Connected to the server on ${host} : ${port}`);
});
socket.on('data', buffer =>{
    let raw = buffer.toString();
    let object = JSON.parse(raw);
    checkForDelivered(object);
});
function checkForDelivered(object){
    if(object.event === 'delivered'){
        console.log('thank you for delivering ', object.payload.orderID)
    }
}
function fakeData(){
    const storeInfo = {
    event: 'pickup',
    time: new Date(),
    payload: {
        store: process.env.STORE,
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress()
        }
    }
    return storeInfo;  
}

setInterval(() =>{
    sendNewOrder()
}, 5000)

function sendNewOrder(){
    let newPackage = JSON.stringify(fakeData());
    socket.write(newPackage);
}