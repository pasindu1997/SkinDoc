const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    NIC:{
        type: Number,
        required:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    age:{
        type: Number,
    },
    contactNo:{
        Types: Number,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required: true
    }
});
module.exports = mongoose.model('User',userSchema);