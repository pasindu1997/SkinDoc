const mongoose = require('mongoose');


const PostClinicsSchema = mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Clinic', PostClinicsSchema);