const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
require('dotenv/config');
const Clinic = require('../models/clinicRate');
// const Rate = require('../models/rate');

// let app = express();

//TO CREATE A CLINIC ON THE DATABASE

//to handle post request to add a clinic
router.post('/',(req, res) => {
    console.log(req.body);
    // try {
    const clinic = new Clinic({
        clinic_email: req.body.clinic_email,
        skinClinicName: req.body.skinClinicName,
        current_rating: req.body.current_rating,
        description: req.body.description,
        address: req.body.address
    });

    clinic.save().then((result)=>{
        res.status(200).json({
            message: "clinic inserted"
        })
    });
    // }catch (err) {
    //     res.json({message: err});
    // }
    // try {
    //     const savedClinics = await clinic.save();
    //     res.json(savedClinics);
    //     console.log('Clinic created on the Data base');
    // } catch (err) {
    //     res.json({message: err});
    // }
});


//TO VIEW ALL THE CLINICS AVAILABLE ON THE DATABASE
router.get('/', async (req, res) => {
    Clinic.find().select('clinic_email skinClinicName current_rating description address').exec().then(result => {
        res.status(200).send(result)
    });
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

//TO INQUIRE THE SKIN CLINIC
//this will take the email from the user and send a email to the clinic including user details
router.post('/sendEmail', async (req, res) => {
    //variable to assign the parameters if the body
    const clinicEmail = req.body.clinic_email;
    const userDetails = req.body.user_details;
    const imageDetails = req.body.image_details;

    //creating a transporter of the nodemailer module to send a automated email to the clinics
    var transporter = nodemailer.createTransport({
        //assigning the service to send the email
        service: 'gmail',
        //email and the password of the skindoc's email and password
        auth:{
            user:'skindoctor2020sl@gmail.com',
            pass: 'v=T4Qwaa',
        }
    });
    //the options of the mail what details to be send
    var mailOption = {
        from: 'skindoctor2020sl@gmail.com',
        to: clinicEmail,
        subject: 'Infomation about a patient from SkinDoc Application',
        html: `<h1>SkinDoc Application</h1>
                <h2>user's details</h2>
                <p>`+ userDetails+`</p>
                <h2>user's image details</h2>
                <p>`+ imageDetails+`</p>`
    };
    //sending the email to the clinic with above mentioned details
    transporter.sendMail(mailOption).then(result =>{
        res.status(200).json({
            message: 'The clinic will contact you Within 24 hours',
        });
    }).catch(err=>{
        console.log(err);
    });
});


//TO UPDATE THE RATING OF A CLINIC


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

// //TO RATE A CLINIC
// router.post('/rate/:_id', async (req, res) => {
//
//     try {
//         const specificClinic = await Clinic.findById(req.params._id);
//         console.log(specificClinic);
//         // const clinicRelated = await Clinic.findById(specificClinic.clinic_email);
//         // DBObject dbObject = DBObject JSON.parse(clinicRelated);
//         // const clinicRelated = await Clinic.findById({specificClinic.clinic_email}).toArray(function(err, result){
//         // });
//         // console.log(clinicRelated);
//     const rate = new Rate({
//         // clinicId: Clinic.findById(req.params._id),
//         clinicId: specificClinic.clinic_email,
//         rate_given: req.body.rate_given,
//         comment: req.body.comment,
//         commented_at: req.body.commented_at,
//         author: req.body.author
//     });
//     try {
//         const savedRates = await rate.save();
//         res.json(savedRates);
//         console.log('Clinic has been rated.');
//     } catch (err) {
//         res.json({message: err});
//     }
//     } catch (err) {
//         res.json(err);
//     }
// });

module.exports = router;
