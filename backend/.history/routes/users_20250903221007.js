const express = require("express")
const router = express.Router()

const User = require("../models/UserSchema")



router.post("/register", async(req,res)=> {
    const {email , password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"})

           }

    let user = await User.findOne({email})  
    if(user){
        return res.status(400).json({message:"User Already Exists"})
    }
    
    const newUser = new User({
        email,
        password
    })

    await newUser.save()

})