const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
require('dotenv/config');
const Clinic = require('../models/clinicRate');
// let app = express();

//TO CREATE A CLINIC ON THE DATABASE
router.post('/', async (req, res) => {
    // console.log(req.body);
    // try {
    const clinic = new Clinic({
        clinic_email: req.body.clinic_email,
        skinClinicName: req.body.skinClinicName,
        current_rating: req.body.current_rating,
        comment: req.body.comment,
        commented_at: req.body.commented_at,
        author: req.body.author

    });
    // }catch (err) {
    //     res.json({message: err});
    // }
    try {
        const savedClinics = await clinic.save();
        res.json(savedClinics);
        console.log('Clinic created on the Data base');
    } catch (err) {
        res.json({message: err});
    }
});


//TO VIEW ALL THE CLINICS AVAILABLE ON THE DATABASE
router.get('/', async (req, res) => {
    try {
        const clinics = await Clinic.find();
        res.json(clinics);
    } catch (err) {
        res.json({message: err});
    }
});

//TO VIEW AN SPECIFIC CLINIC ON THE DATABASE
router.get('/:_id', async (req, res) => {
    try {
        console.log(req.params._id);
        const specificClinic = await Clinic.findById(req.params._id);
        res.json(specificClinic);
        console.log('Clinic you requested');
    } catch (err) {
        console.log(err);
        res.json({message: err});
    }

});


//To update the rating of the clinics, use this route
//To delete a clinic, use this route
//To inquire a clinic, use this route


//     try {
//         mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true}, () => {
//             console.log('Connected to the database');
//         });
//     } catch (err) {
//         res.json({message: err});
//     }
//     res.send('These are the clinics available.');
//

// let resultArray = [];
// mongoose.connect('mongodb+srv://pasindu97:pasindu1997@cluster0-uheo1.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true },function (err,db) {
//     // console.assert(null,err);
//     const cursor = db.collection('clinics').find();
//     cursor.forEach(function (doc,err) {
//             // console.assert(null,err);
//             resultArray.push(doc);
//     }, function () {
//             db.close();
//             res.status(201)('',{items: resultArray}).json({
//                 message : resultArray            })
//         }
//     )
// });
// res.status(201).json({
//     message: 'User created'
// });

// });


module.exports = router;
