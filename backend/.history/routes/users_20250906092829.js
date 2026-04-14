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

router.post("/signin", async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // تأكد أن عند المستخدم role، ولو مش موجود اعتبره user
    const role = user.role || "user";

    // مهم تضمّن role بالـ payload
    const token = jwt.sign(
      { email: user.email, id: user._id, role },
      process.env.SECRET_KEY,
      { expiresIn: "1w" }
    );

    // حدّد مسار التوجيه حسب الدور
    const redirectPath = role === "admin" ? "/admin" : "/";

    // لا ترجّع الباسورد
    // const { password: _, ...safeUser } = user.toObject ? user.toObject() : user;

    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token,
      role,
      redirect: redirectPath,
    //   user: safeUser,
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});



router.get("/:id", async(req,res)=> {
    const user = await User.findById(req.params.id)

    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    return res.status(200).json({user})
})



module.exports = router;
