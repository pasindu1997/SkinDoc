const mongoose = require('mongoose');


const rateClinicsSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,


    clinicId: {
        type: String
    },

    rate_given: {
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

    // clinic_email:{
    //     type: String,
    //     required: true
    // }

});

module.exports = mongoose.model('Rate', rateClinicsSchema);