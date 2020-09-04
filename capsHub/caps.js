'use strict';

require('dotenv').config();
const io = require('socket.io')(process.env.PORT || 3000);
const caps = io.of('/caps'); // this is a namespace
const messages = {
    //waiting for pickup messages to queue 

}
caps.on('connection', socket =>{
    console.log('connected with', socket.id);
    socket.on('join', room =>{
        console.log('joined', room);
        socket.join(room);
        });
    socket.on('getall', ()=>{
        for(let id in messages){
            const payload = messages[id];
            caps.emit('pickup', payload)
        }
    })
    socket.on('received', payload =>{
        //delete messages that have been heard
        delete messages[payload];
    })
    socket.on('pickup', payload =>{
// we want to queue up 'pickup' messages
        messages[payload.orderID] = payload;

        caps.emit('pickup', payload);
        let time = new Date();
        let eventObj = {
            event: 'pickup',
            time:time,
            payload:payload,
        }
        console.log('pickup', Object.keys(messages).length);
        console.log('EVENT', eventObj);
    });        
    socket.on('in-transit', (payload)=>{

        caps.to(process.env.STORE).emit('in-transit', payload);

    })

    socket.on('delivered', (payload)=>{
        caps.to(process.env.STORE).emit('delivered', payload);
    });
});

