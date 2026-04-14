const express = require("express")
const router = express.Router()
const Cart = require("../models/CartSchema")
const {cookieAuth} = require("../auth/middleware")



router.get("/" , cookieAuth , async(req,res)=>{
    try {
       let cart = await Cart.findOne({user:req.user.id}).populate("items.book") 

       if(!cart){
            cart = new Cart({user:req.user.id,items:[]})
       }
    } catch (error) {
        
    } 
})
