const express = require('express');
const user = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { userInfo } = require('os');

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    const userInfo = req.body
  
    bcrypt.hash(userInfo.password, 10).then((encryptedPassword) => {
        const User = new user({
            name : userInfo.name,
            email : userInfo.email,
            contact : userInfo.contact,
            password : encryptedPassword
        })
        User.save().then(newUser => {
            res.status(201).json({
                message : "Encryption Successfull",
                data : newUser
            })
        }).catch(err => {
            res.json({
                message: "Failed to encrypt the password",
                error : err
            })
        })
    }).catch(err => {
        res.json({
            message : "Failed to create new user",
            error : err
        })
    })
})

userRouter.post('/login',(req,res) => {
    const userInfo = req.body
    user.findOne({email : userInfo.email}).then(userr => {
        if(userr){
            return bcrypt.compare(userInfo.password,userr.password).then(authStatus => {
                if(authStatus){
                    return jwt.sign({
                        email : userr.email,
                        id : userr._id
                    },
                    `${process.env.SECRET_KEY}`,
                    {
                        expiresIn : "1h"
                    },(err,token) => {
                        if(err){
                           return res.json({
                                message : "Authentication failed",
                                error : err
                            })
                        }else{
                           return res.json({
                                message : "Authentication successfull",
                                data : token
                            })
                        }
                    })
                }
            })
            .catch(err => {
                res.json({
                    message : "Authentication failed",
                    error : err
                })
            })
        }
    })
})

module.exports = userRouter;