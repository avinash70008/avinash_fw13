const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Post = require("../models/post.model")
const {body,validationResult} = require("express-validator");
const res = require("express/lib/response");


// - User Model
// - firstName (string, required, minimum length 3 and maximum length 30)
// - lastName (string, optional, if given then minimum length 3 and maximum length 30)
// - age (integer, required, should be between 1 and 150)
// - email (string, required, unique)
// - profileImages: (array of imageUrls and atleast 1 profile image is required)
// - timestamps (string, required)

router.post("",
body("firstName").isString().notEmpty().isLength({min:3,max:30}),
body("lastName").isString().isLength({min:3,max:30}),
body("age").isNumeric().custom(async(value)=>{
    if(value <1 && value > 150) {
        throw new Error("Age is not between 1 and 150")
    }
    return true;
}),
body("email").isEmail().notEmpty().custom(async (value)=>{
    const user = await User.findOne({"email":value});
    if(user){
        throw new Error("Email already present")
    }
    return true;
}),
body("profileImages").notEmpty(),
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
        const user = await User.create(req.body);
        return res.send(user);
    }
    catch(error) {
        return res.status(500).send({message:error.message});
    }
});

router.get("",async (req,res) => {
    try {
        const user = await User.find().lean().exec();
        res.send(user);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.get("/:userId",async (req,res)=>{
    try {
        const page = req.query.page || 1;
        const size = req.query.size || 10;
        const query = {"userID":req.params.userId};
        const user = await Post.find(query).skip((page-1)*size).limit(size).lean().exec();
        return res.send(user);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});


module.exports = router;
