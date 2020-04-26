const mongoose = require("mongoose");

//model of the image collection in the database
const imageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    image : {type:String, required:true},
    firstName : {type: String, required: false},
    lastName : {type: String, required: false},
    age : {type: Number, required: true},
    contactNo : {type: Number, required: true},
    email : {type: String, required: true},
    prediction:{type:String,required:true},
    percentage:{type:Number,required:true},
    riskMessage: {type:String,required:true}
});

module.exports = mongoose.model('image',imageSchema);