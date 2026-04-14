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

            console.log("New quantity will be:", newQuantity);
            console.log("Book stock:", book.stock);
            if(newQuantity > book.stock){
                 return res.status(400).json({ message: "Cannot add more items than available stock" })
            }
                console.log("About to update quantity..."); // Add this
                cart.items[existingItemIndex].quantity = newQuantity;
                console.log("Quantity updated successfully"); // Add this

          cart.items[existingItemIndex].quantity = newQuantity 
            
        }else{
           console.log("About to push item:");
console.log("- bookId:", bookId);
console.log("- quantity:", quantity);
console.log("- typeof quantity:", typeof quantity);
console.log("- book.price:", book.price);
           // Add new item to cart
           cart.items.push({
            book:bookId,
            quantity:quantity,
            price: book.price
           })
            console.log("New item added successfully"); // Add this
        }

         console.log("About to save cart..."); // Add this
await cart.save();
console.log("Cart saved successfully"); // Add this

console.log("About to populate cart..."); // Add this
await cart.populate('items.book');
console.log("Cart populated successfully"); // Add this

console.log("About to send response..."); // Add this
res.status(200).json({
    message: "Item added to cart successfully",
    cart
});



    } catch (error) {
     res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }

})


router.put("/update", cookieAuth , async(req,res)=>{

    try {
        const {bookId, quantity} = req.body;
        if(quantity < 1){
         return res.status(400).json({ message: "Quantity must be at least 1" });
        }
     const book = await Book.findById(bookId);
        const cart = await Cart.findOne({user:req.user.id})
     
        const itemIndex = cart.items.findIndex(item => item.book.toString()=== bookId)

        cart.items[itemIndex].quantity = quantity
        cart.items[itemIndex].price = book.price
         await cart.save();
         await cart.populate('items.book');

         res.status(200).json({
          message: "Cart updated successfully",
          cart
        });


        
    } catch (error) {
     res.status(500).json({ message: "Error updating cart", error: error.message }); 
    }
})


// Remove item from cart

router.delete("/remove/:bookId",cookieAuth,async(req,res)=>{
    try {
       const {bookId} = req.params
       
       const cart = await Cart.findOne({user:req.user.id})

        cart.items = cart.items.filter(item => item.book.toString()!==bookId)
         
        await cart.save();
        await cart.populate('items.book');

         res.status(200).json({
          message: "Item removed from cart successfully",
            cart
        });



    } catch (error) {
       res.status(500).json({ message: "Error removing item from cart", error: error.message });
    
    }
})

// Get cart item count

router.get("/count", cookieAuth, async(req,res)=>{
    try {
        const cart = await Cart.findOne({user:req.user.id})

        const itemCount = cart ? cart.totalItems : 0

        res.status(200).json({
            message: "Cart count retrieved successfully",
            count: itemCount
        });


    } catch (error) {
     res.status(500).json({ message: "Error getting cart count", error: error.message });
   
    }
})



module.exports = router;
