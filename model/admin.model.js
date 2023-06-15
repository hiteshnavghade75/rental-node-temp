const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const adminSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'you have to register email']
    },
    contact:{
        type:Number
    },
    password: {
        type: String,
        required: [true, 'you have to register password']
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports =  Admin;