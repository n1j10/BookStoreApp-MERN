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


// routes/cart.js
router.post("/add", cookieAuth, async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.stock <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    // تحقق إذا المنتج موجود بالسلة
    const itemIndex = cart.items.findIndex(it => it.book.toString() === bookId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ book: bookId, quantity: 1, price: book.price });
    }

    // نقص من stock
    book.stock -= 1;
    await book.save();
    await cart.save();

    return res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});






// Remove item from cart

router.delete("/remove/:bookId", cookieAuth, async (req, res) => {
  try {
    const { bookId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(it => it.book.toString() === bookId);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

    const item = cart.items[itemIndex];
    const book = await Book.findById(bookId);
    if (book) {
      book.stock += item.quantity;
      await book.save();
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
});


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
