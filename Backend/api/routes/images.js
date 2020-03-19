const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/image');

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

router.post('/',checkAuth,upload.single('image'),(req,res,next)=>{
    console.log(req.file);
    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        image: req.file.path,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        NIC: req.body.NIC
    });
    //saving to the database
    image.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'handling post requests to /image',
            created: {
                _id: result._id,
                request:{
                    type: 'GET',
                    url:'http://localhost:3000/image/' + result._id
                }
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


module.exports = router;