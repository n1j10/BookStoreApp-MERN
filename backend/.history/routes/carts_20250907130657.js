const express = require("express")
const router = express.Router()
const Cart = require("../models/CartSchema")
const { cookieAuth } = require("../auth/middleware")
const Book = require("../models/BookSchema")

// const {cookieAuth} = require("../auth/middleware")



router.get("/" , cookieAuth , async(req,res)=>{
    try {
       let cart = await Cart.findOne({user:req.user.id}).populate("items.book") 

       if(!cart){   
            cart = new Cart({user:req.user.id,items:[]})
            await cart.save();

            res.status(200).json({
            message: "Cart retrieved successfully",
            cart
        });
       }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart", error: error.message });
    } 



})


router.post("/add",cookieAuth , async(req,res)=>{
    try {
         const {bookId, quantity = 1} = req.body

         if (!bookId) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        // Check if book exists
         const book = await Book.findById(bookId);

          // Check stock availability

          if(book.stock <  quantity){

           return res.status(400).json({ message: "Insufficient stock available" });
          }

          // Find or create cart
          let cart = await Cart.findOne({user:req.user.id})
          if(!cart)  {
             cart = new Cart({user:req.user.id,items:[]})
          }

        // Check if item already exists in cart

        const existingItemIndex= cart.items.findIndex(item => item.book.toString()=== bookId)

        if(existingItemIndex > -1){
            const newQuantity = cart.items[existingItemIndex].quantity + quantity

            if(newQuantity > book.stock){
                 return res.status(400).json({ message: "Cannot add more items than available stock" })
            }
         
          cart.items[existingItemIndex].quantity = newQuantity 
            
        }else{
           // Add new item to cart
           cart.items.push({
            bokk
           })
        }



    } catch (error) {
        
    }

})






module.exports = router;
