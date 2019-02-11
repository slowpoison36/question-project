const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question:{type:String,required:true},
    description:String,
    created:{type:Date,default:Date.now},
    answer:[{type:mongoose.Schema.Types.ObjectId,ref:"Answer"}]
})

module.exports = mongoose.model("Question",questionSchema);