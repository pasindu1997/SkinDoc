const mongoose = require('mongoose');


let Post = mongoose.model('clinicRate', {
    rating_count: Number,
    comment: String,
    commented_at: Date,
    author: String
});

module.exports = Post;