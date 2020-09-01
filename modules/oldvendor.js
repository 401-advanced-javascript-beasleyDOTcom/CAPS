'use strict';
const events = require('../events');
let store = process.env.STORENAME;
const storeInfo = {
    store: '1800 no mo',
    orderID: '1234',
    customer: 'testerRoni',
    address: '1234 get dr, me crazy, ca'
};

function start(){
    setInterval(()=>{
        events.emit('pickup', storeInfo);
    }, 5000)
    
}


events.on('delivered', payload =>{
    handleDelivered(payload);
})
function handleDelivered(payload){
    return console.log(`VENDOR: Thank you for delivery ${payload.orderID}`);
}


module.exports ={start};