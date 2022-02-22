const express = require("express");
const router = express.Router();

const PostLike = require("../models/postLike.model");
const {body,validationResult} = require("express-validator");

// - PostLike Model
// - postId ( references post collection)
// - userId ( references user collection)

router.post("",
body("postId").notEmpty(),
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
        const postLike = await PostLike.create(req.body);
        return res.send(postLike);
    }
    catch(error) {
        return res.status(500).send({message:error.message});
    }
});


router.get("",async (req,res) => {
    try {
        const postLike = await PostLike.find().populate("userId").populate("postId").lean().exec();
        res.send(postLike);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

module.exports = router;