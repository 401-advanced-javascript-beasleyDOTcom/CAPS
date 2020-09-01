// main hub of application
const events = require('./events');

require('./modules/driver');
require('./modules/vendor');
// events.on('pickup', onPickup);
events.on('pickup', payload =>{
    logEvent('pickup', payload);
})
events.on('in-transit', payload =>{
    logEvent('in-transit', payload);
})
events.on('delivered', payload =>{
    logEvent('delivered', payload);
})

function logEvent(event, payload){
 let time = new Date();
 console.log('EVENT', {event, payload})
}

/*
EVENT { event: 'pickup',
  time: 2020-03-06T18:27:17.732Z,
  payload:
   { store: '1-206-flowers',
     orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
     customer: 'Jamal Braun',
     address: 'Schmittfort, LA' } }
 */
module.exports = logEvent;