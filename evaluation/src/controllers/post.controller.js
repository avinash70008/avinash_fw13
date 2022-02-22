const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const {body,validationResult} = require("express-validator");

// - Post Model
// - body (string, optional),
// - likes (integer, minimum default is 0)
// - image (string, optional)
// - timestamps (string, required)

router.post("",
body("body").isString(),
body("likes").custom(async(value)=>{
    if(value==null) return 0;
    return true;
}),
body("userId").notEmpty(),
async (req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let newErrors;
            newErrors = errors.array().map((err) => {
                console.log("err:",err);
                return {key:err.param,message:err.msg};
            });
            return res.status(400).send({error:newErrors});
        }
        const post = await Post.create(req.body);
        return res.send(post);
    }
    catch(error) {
        return res.status(500).send({message:error.message});
    }
});

router.get("",async (req,res) => {
    try {

        const post = await Post.find().populate("userId").lean().exec();
        res.send(post);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})


module.exports = router;