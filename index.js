const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require("cors");
const db = require('./db/connection');
const router = require('./router/user.router');
const carsRouter = require('./router/cars.router')
const adminRouter = require('./router/admin.router')
const bookingRouter=require('./router/booking.router')
const orderRouter=require('./router/order.router')
const PORT=process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(cors())

app.use('/user', router);
app.use('/admin', adminRouter)
app.use('/cars', carsRouter)
app.use('/booking', bookingRouter)
app.use('/order',orderRouter)

app.listen(PORT,()=>{
    console.log(`Server listening...,${PORT}`)
});