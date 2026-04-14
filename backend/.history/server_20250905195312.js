const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()
const path = require("path")


const connectDB = require("./config/db")


connectDB();
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(cors())
app.use(express.json())


app.use("/users" ,require("./routes/users"))
app.use("/books" ,require("./routes/books"))
app.use("/category" ,require("./routes/category"))


const PORT  = process.env.PORT || 3000

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})