const mongoose = require("mongoose");
// - PostLike Model
// - postId ( references post collection)
// - userId ( references user collection)

const postLikeSchema = new mongoose.Schema({
    likes:{type:Number,required:true,default:0},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"post",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
},{
    versionKey:false,
    timestamps:false,
});

module.exports = mongoose.model("postLike",postLikeSchema);
