const mongoose = require("mongoose");
// - Post Model
// - body (string, optional),
// - likes (integer, minimum default is 0)
// - image (string, optional)
// - timestamps (string, required)

const postSchema = new mongoose.Schema({
    body: {type:String,required:false},
    likes: {type:Number,required:true,default:0},
    image: {type:String,required:false},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
},{
    versionKey:false,
    timestamps:true,
});

module.exports = mongoose.model("post",postSchema);