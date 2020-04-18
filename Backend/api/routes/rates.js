const express = require('express');
const router = express.Router();
require('dotenv/config');
const Clinic = require('../models/clinicRate');
const Rate = require('../models/rate');
const updateRating = require('../middleware/rating_updater');


//TO RATE A CLINIC
router.post('/:_id', updateRating, async (req, res) => {

    try {
        const specificClinic = await Clinic.findById(req.params._id);
        console.log(specificClinic);
        // const clinicRelated = await Clinic.findById(specificClinic.clinic_email);
        // DBObject dbObject = DBObject JSON.parse(clinicRelated);
        // const clinicRelated = await Clinic.findById({specificClinic.clinic_email}).toArray(function(err, result){
        // });
        // console.log(clinicRelated);
        const rate = new Rate({
            // clinicId: Clinic.findById(req.params._id),
            clinicId: specificClinic.clinic_email,
            rate_given: req.body.rate_given,
            comment: req.body.comment,
            commented_at: req.body.commented_at,
            author: req.body.author
        });
        try {
            const savedRates = await rate.save();
            res.json(savedRates);
            console.log('Clinic has been rated.');
        } catch (err) {
            res.json({message: err});
        }
    } catch (err) {
        res.json(err);
    }
});

//TO SHOW ALL THE RATINGS OF A PARTICULAR CLINIC
router.get('/:_id', updateRating, async (req, res) => {

    try {
        // console.log(req.params._id);
        const specificClinicId = await Clinic.findById(req.params._id);
        // console.log(specificClinicId);
        const clinicId = specificClinicId.clinic_email;
        // console.log(clinicId);
        const query = await Rate.find({clinicId: clinicId});
        // console.log(query);
        // const specificClinicEmail = await Rate.find({''});
        // // console.log(specificClinicEmail);
        // const allRatings = await Rate.findById(specificClinicId._Id);
        // console.log(allRatings);
        res.json(query);

    } catch (err) {
        res.json(err);
    }


});


//
// router.get('/ratingUpdater/:_id', async (req, res) => {
//
//     try {
//         console.log(req.params._id);
//         const specificClinicId = await Clinic.findById(req.params._id);
//         console.log(specificClinicId);
//         const currentRating = specificClinicId.current_rating;
//         console.log(currentRating);
//
//
//         const newCurrentRating = currentRating + 10;
//         console.log(newCurrentRating);
//
//
//
//
//
//         const query = await Rate.find({rate_given: re});
//         // console.log(query);
//         // const specificClinicEmail = await Rate.find({''});
//         // // console.log(specificClinicEmail);
//         // const allRatings = await Rate.findById(specificClinicId._Id);
//         // console.log(allRatings);
//         res.json(query);
//
//     } catch (err) {
//         res.json(err);
//     }


// });


module.exports = router;
