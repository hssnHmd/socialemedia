const postRouter = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

postRouter.post("/", async (req, res)=> {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).send(savedPost)
    } catch (error) {
        res.status(401).send(error)
    }
})

postRouter.put("/:id", async(req, res) => {
    try {
        const post =await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body})
            res.status(200).send("post has been updated")
        } else {
          res.status(403).send("you can update only your post");
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

postRouter.delete("/:id", async(req, res) => {
     try {
       const post = await Post.findById(req.params.id);
       if (post.userId === req.body.userId) {
         await post.deleteOne();
         res.status(200).send("post has been deleted");
       } else {
         res.status(403).send("you can delete only your post");
       }
     } catch (error) {
       res.status(500).send(error);
     }

})

postRouter.put("/:id/like",async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
      await post.updateOne({$push: {likes: req.body.userId}})
      res.status(200).send("post has been liked ")
    }else{
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send("post has been disliked ")
    }
  } catch (error) {
    res.status(403).send(error)
  }
})

postRouter.get("/:id", async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post)
  } catch (error) {
    res.status(404).send(error);   
  }
})

postRouter.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId: currentUser._id});
    const friendsPost = await Promise.all(
      currentUser.folowins.map((friend) => {
        return Post.find({ userId: friend });
      })
    );
    res.status(200).send(userPosts.concat(...friendsPost))
  } catch (error) {
    res.status(500).send(error)
  }
})

postRouter.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.username});
    const posts = await Post.find({ userId: user._id });
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = postRouter;