const express = require("express")
const router = express.Router()
const Category = require("../models/CategorySchema")


router.post("/createCategory", async(req,res)=>{
    try {
        const {name}= req.body
    if(!name){
         return res.status(400).json({ error: 'Name is required' });
    }

    const newCategory = new Category({
        name
    })

    await newCategory.save()
   res.status(201).json({ message: "Category  created successfully", book: newCategory });
    } catch (error) {
     res.status(500).json({ error: err.message });
    }
    



})


router.get("/getCategories", async  (req,res)=> {

    try {
      const category = await Category.find()

      return res.json(category)

    } catch (error) {

     res.status(500).json({ error: error.message })
  
    }
})


module.exports = router;
