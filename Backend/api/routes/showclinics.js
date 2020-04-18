const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
require('dotenv/config');
const Clinic = require('../models/clinicRate');


router.post('/', (req, res) => {
    console.log(req.body);
    try {
        const clinic = new Clinic({
            skinClinicName: req.body.skinClinicName,
            current_rating: req.body.current_rating,
            comment: req.body.comment,
            commented_at: req.body.commented_at,
            author: req.body.author
        });
        clinic.save()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.json({message: err});
            })

    } catch (e) {
        console.log(e);
    }
});


// router.get('/', async (req, res) => {
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
