'use strict';
const EE = require('events');

const events = new EE();


//exporting single instance of emitter (a class) is called a "singleton"
module.exports = events;