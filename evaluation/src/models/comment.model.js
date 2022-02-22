const mongoose = require("mongoose");
// - Comment Model
// - body ( string, required)
// - timestamps (string, required)

const commentSchema = new mongoose.Schema({
    body:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"post",required:true},
},
{
    versionKey:false,
    timestamps:true,
})

module.exports = mongoose.model("comment",commentSchema);