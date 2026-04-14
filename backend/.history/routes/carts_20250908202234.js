const express = require("express")
const router = express.Router()
const Cart = require("../models/CartSchema")
const Book = require("../models/BookSchema")

const {cookieAuth} = require("../auth/middleware")


router.get("/", cookieAuth, async(req,res)=>{
    try{
        let cart = await Cart.findOne({user:req.user.id}).populate("items.book","title price coverImage stock")

        if(!cart){
            cart = new Cart({user:req.user.id,items:[]})
            await cart.save()
        }

       return res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      cart,
    });


    }catch{
         console.error("Error retrieving cart:", error);
       return res.status(500).json({
      success: false,
      message: "Error retrieving cart",
      error: error.message,
    });
    }
})

router.post("/add", cookieAuth, async(req,res)=>{
    try {

        const {bookId} = req.body

        const book = await Book.findById(bookId)


         let cart = await Cart.findOne({user:req.user.id}).populate("items.book","title price coverImage stock")

        if(!cart){
            cart = new Cart({user:req.user.id,items:[]})
           
        }

        const itemIndex = cart.items.findIndex(it => it.book.toString() === bookId)

        if(itemIndex  > -1){
            cart.items[itemIndex].quantity +=1
        }else{
            cart.items.push({book:bookId, price:book.price, quantity:1})
        }
        book.stock -=1
        book.save()
        cart.save()

         return res.json({ success: true, cart });
        
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
})


router.put("/update", cookieAuth, async(req,res)=>{
    try {

        const {bookId,quantity} = req.body



        let cart = await Cart.findOne({user:req.user.id}).populate("items.book","title price coverImage stock")

        if(!cart){
            cart = new Cart({user:req.user.id,items:[]})
           
        }

       const item = cart.items.find(it => it.book._id.toString() ===bookId)

       const book = await Book.findById(bookId)

       const diff = quantity  - item.quantity

       if(diff > 0){
        if(book.stock < diff) return res.status(400).json({ message: "Not enough stock" });

        book.stock -= diff 
       }else{
         book.stock += Math.abs(diff);

       }

       item.quantity = quantity
       await book.save()
       await cart.save()

       res.json({ success: true, cart });

        
    } catch (err) {
         res.status(500).json({ message: "Error updating cart", error: err.message });
    }
})





module.exports = router;

