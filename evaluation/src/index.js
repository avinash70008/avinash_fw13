const express = require('express');

const app = express();

const connect = require("./configs/db")

const userController = require("./controllers/user.controller");
const commentController = require("./controllers/comment.controller");
const postController = require("./controllers/post.controller");
const postLikeController = require("./controllers/postLike.controller");

app.use(express.json());
app.use("/users",userController);
app.use("/posts",postController);
app.use("/comments",commentController);
app.use("/postLikes",postLikeController);



app.listen(2345,async ()=>{
    try{
        await connect();
        console.log("Listening on the port 2345");
    }
    catch(error){
        console.log("Error: " + error);
    }
})