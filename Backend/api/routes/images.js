const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/image');
const fetch = require('node-fetch');

//this is the package used to upload the files
const multer = require('multer');
const checkAuth = require('../middleware/auth_checker');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cd is callback function.this executes every time a picture is uploaded
        cb(null,'./uploads');
    },
    filename:function (req, file, cb){
        cb(null,file.originalname)
    }
});

const fileFilter = (req,file,cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else {
        cb(null,false);
    }
};

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5 //this will be taken in bytes
    },
    fileFilter: fileFilter

});

router.post('/',upload.single('image'),(req,res,next)=>{
    console.log(req.file);
    const name = req.file.originalname;
    const api = `http://127.0.0.1:5000/flask/predict?filename=${name}`;
    fetch(api,{method:'POST'})
        .then(res => res.json())
        .then(json => {
            const image = new Image({
                _id: new mongoose.Types.ObjectId(),
                image: req.file.originalname,
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                age: req.body.age,
                contactNo: req.body.contactNo,
                email: req.body.email,
                prediction: json['Prediction'],
                percentage: json['Probability']
            });

            //saving to the database
            image.save().then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Image successfully uploaded',
                    created: {
                        prediction: result.prediction,
                        percentage: result.percentage
                    }
                });
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });
        });


});

router.post('/findImage',(req,res,next)=>{
    Image.find({'email':req.body.email})
        .select('image firstName lastName age contactNo email prediction percentage')
        .exec()
        .then(result => {
            console.log("this is from database",result);
            if(result){
                res.status(200).send(result);
            }else{
                res.status(404).send({
                    message: 'Not a valid id'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
});

router.post('/deleteImage',(req,res,next) => {
    Image.find({image:req.body.imageName}).exec().then((result) => {
        
        if (!result){
            res.status(404).json({
                messgae: "Image not found"
            })
        }else{
            console.log(req.body.imageName);
            console.log(result[0].image);
            Image.deleteOne({image : result[0].image})
                .exec()
                .then(deletedUser => {
                    res.status(200).json({
                        message: "The Image has been deleted",
                        userDeleted: deletedUser
                    })
                })
                .catch(err => {
                    res.status(409).json({
                        message: err
                    })
                });
        }
    }).catch(err => {
        res.status(409).json({
            message:err
        })
    });
});




module.exports = router;