const express = require("express")
const app = express()

const cors = require("cors")
const dotenv = require("dotenv").config()

const connectDB = require("./config/db")


connectDB();
app.use(cors({
  origin: "http://localhost:3000", // Your React app's URL
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())


app.use("/users" ,require("./routes/users"))
app.use("/books" ,require("./routes/books"))
app.use("/category" ,require("./routes/category"))
app.use("/admin" ,require("./routes/admin"))

app.use("/images",express.static("images"))

const PORT  = process.env.PORT || 3000

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})