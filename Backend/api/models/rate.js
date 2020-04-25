const mongoose = require('mongoose');


const rateClinicsSchema = mongoose.Schema({


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

    author: {
        type: String,
        required: false
    },


});

module.exports = mongoose.model('Rate', rateClinicsSchema);