const mongoose = require('mongoose');


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

    comment: {
        type: String,
        required: false
    },

    commented_at: {
        type: Date,
        Default: Date.now(),
        required: true
    },

    author: {
        type: String,
        required: false
    },

    clinic_email: {
        type: String,
        required: true
    },


});

module.exports = mongoose.model('Clinic', PostClinicsSchema);