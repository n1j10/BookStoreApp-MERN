const express = require("express")
const router = express.Router()

const User = require("../models/UserSchema")
const bcrypt = require("bcrypt")


router.post("/register", async(req,res)=> {
    const {email , password, name} = req.body
    if(!email || !password || !name){
        return res.status(400).json({message:"Email and Name and password are required"})

           }

    let user = await User.findOne({email})  
    if(user){
        return res.status(400).json({message:"User Already Exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = new User({
        email,
        password:hashedPassword,
        name
    })

    await newUser.save()
     res.status(201).json({ message: "User registered successfully", user: newUser });


})



module.exports = router;
