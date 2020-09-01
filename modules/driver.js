'use strict';
const events = require('../events');

events.on('pickup', inTransitHandler);
events.on('in-transit', deliveredHandler);

function inTransitHandler(payload){
  setTimeout(()=>{
      console.log(`Driver: picked up ${payload.orderID}`)
      events.emit('in-transit', payload);
  }, 1000)
}
function deliveredHandler (payload){
  setTimeout(()=>{
    console.log(`Driver: delivered ${payload.orderID}`)
    return  events.emit('delivered', payload.orderID)
  }, 3000)
  
}

