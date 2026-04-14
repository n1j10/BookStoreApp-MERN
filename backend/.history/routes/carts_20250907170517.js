const express = require("express")
const router = express.Router()
const Cart = require("../models/CartSchema")
const { cookieAuth } = require("../auth/middleware")
const Book = require("../models/BookSchema")

// const {cookieAuth} = require("../auth/middleware")



router.get("/", cookieAuth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate("items.book");
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    return res.status(200).json({
      message: "Cart retrieved successfully",
      cart
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving cart", error: error.message });
  }
});


router.post("/add", cookieAuth, async (req, res) => {
  try {
    const bookId = req.body?.bookId;
    const qty = Math.max(1, parseInt(req.body?.quantity, 10) || 1); // 👈 تثبيت

    if (!bookId) return res.status(400).json({ message: "Book ID is required" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.stock < qty) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    // تنظيف العناصر الفاسدة (إن وجدت) قبل أي تعديل
    cart.items = cart.items
      .filter(it => Number(it.quantity) >= 1)
      .map(it => ({ ...it.toObject?.() ?? it, quantity: Math.max(1, Number(it.quantity) || 1) }));

    const idx = cart.items.findIndex(it => String(it.book?._id || it.book) === String(bookId));

    if (idx > -1) {
      const newQty = cart.items[idx].quantity + qty;
      if (newQty > book.stock) {
        return res.status(400).json({ message: "Cannot add more items than available stock" });
      }
      cart.items[idx].quantity = newQty;
      cart.items[idx].price = book.price;
    } else {
      cart.items.push({ book: bookId, quantity: qty, price: book.price });
    }

    // عدّل مخزون الكتاب
    await Book.findByIdAndUpdate(bookId, { $inc: { stock: -qty } });

    await cart.save();
    await cart.populate('items.book', 'title price coverImage author');

    return res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("ADD CART ERROR:", error);
    return res.status(500).json({ message: "Error adding item to cart", error: error.message });
  }
});



router.put("/update", cookieAuth , async(req,res)=>{

    try {
        const {bookId, quantity} = req.body;
        if(quantity < 1){
         return res.status(400).json({ message: "Quantity must be at least 1" });
        }
     const book = await Book.findById(bookId);
        const cart = await Cart.findOne({user:req.user.id})
     
        const itemIndex = cart.items.findIndex(item => item.book.toString()=== bookId)

        const oldQuantity = cart.items[itemIndex].quantity;
        const quantityDifference = quantity - oldQuantity;

        // Check if we have enough stock for the increase
        if (quantityDifference > 0 && book.stock < quantityDifference) {
            return res.status(400).json({ message: "Not enough stock available" });
        }


         // Update cart quantity
        cart.items[itemIndex].quantity = quantity
        cart.items[itemIndex].price = book.price


        // Update book stock (adjust by the difference)
        await Book.findByIdAndUpdate(bookId, { 
            $inc: { stock: -quantityDifference } 
        });
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

        // Find the item to get its quantity before removing

        const itemToRemove = cart.items.find(item=>item.book.toString()===bookId)

          // Restore stock
        await Book.findByIdAndUpdate(bookId, { 
            $inc: { stock: itemToRemove.quantity } 
        });

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
