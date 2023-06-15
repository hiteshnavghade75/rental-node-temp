const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema =new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);

module.exports =  User;