const express = require("express")
const app = express()

const cors = require("cors")
const dotenv = require("dotenv").config()


const connectDB = require("./config/db")


connectDB();

app.use(express.json())


app.use("/users" ,require("./routes/users"))

app.use("/books" ,require("./routes/books"))
app.use(cors())
const PORT  = process.env.PORT || 3000

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})