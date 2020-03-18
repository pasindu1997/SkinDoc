

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup',(req,res,next) =>{
    User.find({email:req.body.email})
        .exec()
        .then(result =>{
            console.log(result.length);
            if (!result.length>=1){
                bcrypt.hash(req.body.password,10/*this is the salt value(random string which avoids hashing back)*/, (err,hash) =>{
                    if (err){
                        return res.status(500).json({
                            error:err
                        });
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User created'
                            })
                        }).catch(err => ({
                            error:err
                        }))
                    }

                })
            }else{
                res.status(409).json({
                    message: 'email already exist'
                })
            }
        })
        .catch(err => {
            res.status(409).json({
                message:err
            })
        });

});

module.exports = router;