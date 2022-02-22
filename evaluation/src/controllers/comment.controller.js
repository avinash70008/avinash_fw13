const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");
const {body,validationResult} = require("express-validator");

// - Comment Model
// - body ( string, required)
// - timestamps (string, required)

router.post("",
body("body").isString().notEmpty(),
body("userId").notEmpty(),
body("postId").notEmpty(),
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
        const comment = await Comment.create(req.body);
        return res.send(comment);
    }
    catch(error) {
        return res.status(500).send({message:error.message});
    }
});


router.get("",async (req,res) => {
    try {
        const comment = await Comment.find().populate(["userId","postId"]).lean().exec();
        res.send(comment);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.delete("/:commentId",async (req,res)=>{
    try {
        const query = {"commentId":req.params.id}
        const user = await Comment.findByIdAndDelete(query);
        return res.send(user);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});


module.exports = router;