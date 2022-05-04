const userRouter = require("express").Router();
const User = require('../models/User')
const bcrypt = require("bcrypt")


userRouter.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
           try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt); 
           } catch (error) {
               res.status(403).send(error);
           } 
        }
        try {
          const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          res.status(200).send("Account has been updated");
        } catch (error) {
          res.status(500).send(error);
        }
    }else{
        res.status(403).send("You can update only your account");
    }
})

userRouter.delete("/:id", async(req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).send("Your account has been deleted successfully")
    } catch (error) {
      res.status(403).send(err);
    }
  }else{
    res.status(403).send("You can delete only your account");
  }
})

userRouter.get("/", async (req, res)=> {
  const userId = req.query.userId;
  const username = req.query.username
  try{
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({username: username});
    const {password, updatedAt, ...others} = user._doc
    res.status(200).send(others)
  } catch(err){
    res.status(404).send(err)
  }
})

// Get friends
userRouter.get('/friends/:userId', async (req, res) => {
try {
  const user = await User.findById(req.params.userId);
  const friends = await Promise.all(
    user.folowins.map((frienId) => {
      return User.findById(frienId)
    })
  )
  let friendList = [];
  friends.map((friend) => {
    const {_id, username, profilePicture} = friend;
    friendList.push({ _id, username, profilePicture });
  })
  res.status(200).send(friendList)
} catch (error) {
  res.status(500).send(error)
}  
})

userRouter.put("/:id/follow", async(req, res) => {
  if(req.body.userId !== req.params.id){
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId)
      if(!user.folowers.includes(req.body.userId)){
        await user.updateOne({ $push: { folowers: req.body.userId } });
        await currentUser.updateOne({ $push: { folowins: req.params.id } });
        res.status(200).send( user.username + "  has been followed By " +currentUser.username )
      }else{
        res.status(403).send("you allready following")
      }
    } catch (error) {
      
    }
  }else{
    res.status(403).send("you can not follow yourself")
  }
})
userRouter.put("/:id/unfollow", async(req, res) => {
  if(req.body.userId !== req.params.id){
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(user.folowers.includes(req.body.userId)){
        await user.updateOne({ $pull: { folowers: req.body.userId } });
        await currentUser.updateOne({ $pull: { folowins: req.params.id } });
        res.status(200).send("User has been unfollowed!!")
      }else{
        res.status(401).send("you allready unfollow this user");
      }
    } catch (error) {
      res.status(403).send(error)
    }
  }
})
module.exports = userRouter;