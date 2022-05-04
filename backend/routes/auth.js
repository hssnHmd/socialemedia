const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");


authRouter.post("/register", async(req, res)=> {    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashPassword,
        });

        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(500).send(error)
    }
})

authRouter.post("/login", async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(user){
        const validePassword = await bcrypt.compare(req.body.password, user.password)
        if(validePassword){ 
            const { password, ...others } = user._doc;
            res.status(200).send(others);
        }else{
            res.status(400).send("password not matched");
        }
    }else{
        res.status(404).send("user not found")
    }

})

module.exports = authRouter;