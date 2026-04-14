const express = require("express")
const app = express()

const cors = require("cors")

app.use(cors())
const dotenv = require("dotenv").config()
const PORT  = process.env.PORT || 3000

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})