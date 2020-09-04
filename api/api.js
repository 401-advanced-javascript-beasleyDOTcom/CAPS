'use strict'
require('dotenv').config();
const express = require('express');
const app = express();
const io = require('socket.io-client').connect(process.env.URL);
const cors = require('cors');
const faker = require('faker');
const { urlencoded } = require('express');

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors());

const PORT = process.env.PORT || 3005;

app.post('/pickup', (request, response) =>{
    let somebodyHasNoBody = !!Object.keys(request.body).length;
    const storeInfo = somebodyHasNoBody ? request.body : {
        store: process.env.STORE,
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress()
        };
        io.emit('pickup', storeInfo);
        response.status(200).send('Scheduled for pickup');
})
app.listen(PORT, ()=>{
    console.log('glistening on', PORT );
});