const express = require("express")
const router = express.Router()

const User = require("../models/UserSchema")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

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

    let token = jwt.sign({email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:"1w"})
    res.status(201).json({ message: "User registered successfully", user: newUser, token });


})

router.post("/signin", async(req,res)=> {
    const {password, email} = req.body

    if(!email || !password ){
        return res.status(400).json({message:"Email and Name and password are required"})

       }

       let user = await User.findOne({email})

       if(user && await bcrypt.compare(password, user.password)){
       let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY,{expiresIn:"1w"}) 

    return   res.status(201).json({ message: "User Signin successfully",user, token });
       }
       else{

     return res.status(400).json({ message: 'Invalid email or password' });
       }


})


router.get("/:id", async(req,res)=> {
    const user = await User.findById(req.params.id)

    if(!user){
        return res.status(400).json({message:"User Not Found"})
    }
})



module.exports = router;
