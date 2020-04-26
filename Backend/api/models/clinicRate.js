const mongoose = require('mongoose');

//model of the clinics collection in the database
const PostClinicsSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,

    skinClinicName: {
        type: String,
        required: true
    },


    current_rating: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: false
    },


    address: {
        type: String,
        required: false
    },

    clinic_email: {
        type: String,
        required: true
    },


});

module.exports = mongoose.model('Clinic', PostClinicsSchema);