const mongoose = require("mongoose")

const imageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    image : {type:String, required:true},
    firstName : {type: String, required: false},
    lastName : {type: String, required: false},
    NIC : {type: Number, required: true}
});
module.exports = mongoose.model('image',imageSchema);