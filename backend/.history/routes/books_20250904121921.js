const express = require("express")
const router = express.Router()
const Book = require("../models/BookSchema")


router.post("/createBook", async(req,res)=>{
    try {
        const {title,author,description,price,stock,isFeautred,category,discountPercent ,isOnSale } = req.body

    if(!title || !author || !description || !price || !stock){
         return res.status(400).json({ error: 'All fields are required' });
    }

    const newBook = new Book({
      title,
      author,
      description,
      price,
      stock,
      isFeautred,
      isOnSale,
      discountPercent,
      category
    })

    await newBook.save()
   res.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
     res.status(500).json({ error: error.message });
    }
    



})


router.get("/getBooks", async  (req,res)=> {

    try {
      const books = await Book.find().populate("category","name")

      return res.json(books)

    } catch (error) {

     res.status(500).json({ error: error.message })
  
    }
})


module.exports = router;
