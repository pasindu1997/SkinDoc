

//imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//this is the api route to handle signups
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
                        //creating a object to User
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            age:req.body.age,
                            contactNo: req.body.contactNo,
                            email: req.body.email,
                            password: hash
                        });
                        // saving the above created user
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
            // if the user is existing sends a response with a message which says email already exist
            }else{
                res.status(409).json({
                    message: 'email already exist'
                })
            }
        })
        //catching if the request can be processed
        .catch(err => {
            res.status(409).json({
                message:err
            })
        });

});
//this is the route that is use to handle the logins
router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email}).exec()
        .then(Users => {
            //checking if the user is exisiting in the database
            if (Users.length<1){
                return res.status(401).json({
                    message:"not a user"
                })
            }
            //checking whether the password is correct
            if (bcrypt.compareSync(req.body.password, Users[0].password)){
                console.log("hetti");
                const token = jwt.sign({
                    email:Users[0].password,
                    userId: Users[0]._id
                }, process.env.JWT_KEY,{
                    expiresIn: "1h"
                });
                //creating a User jason with the details of the user from the database results.
                const user = {
                  firstName: Users[0].firstName,
                  lastName: Users[0].lastName,
                  age: Users[0].age,
                  contactNo: Users[0].contactNo,
                  email: Users[0].email,

                };
                //send the back a response to say that the authentication is successfull with a status code 200 and the generated token
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    userDetails: user
                })
            //send a response saying auth fail with a status code of 401
            }else{
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }

        })
        //catching the error if the database is not connected
        .catch(err => {
            res.status(401).json({
                message:"err"
            })
        });
});
//handles the delete request of the user.
router.delete('/:userId',(req,res,next) => {
    User.findById(req.params.userId).exec().then(result => {
        //checking if the user is existing or not in the database
        if (!result){
            res.status(409).json({
                messgae: "userID does not exist"
            })
        }else{
            //removing the user to the corresponding id
            User.remove({_id : result._id})
                .exec()
                .then(deletedUser => {
                    res.status(200).json({
                        message: "the user has been deleted",
                        userDeleted: deletedUser
                    })
                })
                .catch(err => {
                    res.status(409).json({
                        message: err
                    })
                });
        }
    //catching the error if there is an error
    }).catch(err => {
        res.status(409).json({
            message:err
        })
    });
});

module.exports = router;
