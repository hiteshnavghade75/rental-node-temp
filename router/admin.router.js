const express = require('express');
const admin = require("../model/admin.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminRouter = express.Router();

adminRouter.post("/register", (req, res) => {
    const adminInfo = req.body
    bcrypt.hash(adminInfo.password, 10).then((encryptedPassword) => {
        const Admin = new admin({
            name : adminInfo.name,
            email : adminInfo.email,
            contact : adminInfo.contact,
            password : encryptedPassword
        })
        Admin.save().then(newAdmin => {
            res.status(201).json({
                message : "Encryption Successfull",
                data : newAdmin
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

adminRouter.post('/login',(req,res) => {
    const adminInfo = req.body
    admin.findOne({email : adminInfo.email}).then(adminn => {
        if(adminn){
            return bcrypt.compare(adminInfo.password,adminn.password).then(authStatus => {
                if(authStatus){
                    return jwt.sign({
                        email : adminn.email,
                        id : adminn._id
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

module.exports = adminRouter;