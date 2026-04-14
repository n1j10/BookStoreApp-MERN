const express = require("express")
const router = express.Router()
const Category = require("../models/CategorySchema")


router.post("/createCategory", async(req,res)=>{
    try {
        const {name}= req.body
    if(!name){
         return res.status(400).json({ error: 'Name is required' });
    }

    const newCategory = new Book({
        name
    })

    await newCategory.save()
   res.status(201).json({ message: "Category  created successfully", book: newCategory });
    } catch (error) {
     res.status(500).json({ error: err.message });
    }
    



})


module.exports = router;
