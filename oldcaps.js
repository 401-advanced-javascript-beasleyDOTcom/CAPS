// main hub of application
const events = require('./events');

require('./modules/olddriver');
require('./modules/oldvendor');

// // class code example
// events.on('pickup', eventHandler('pickup'));
// events.on('in-transit', eventHandler('in-transit'));
// events.on('delivered', eventHandler('delivered'))
// function eventHandler(eventName){
//     return payload =>{
//         const time = new Date();
//         console.log('EVENT', {event: eventName, time, payload})
//     }
// }


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