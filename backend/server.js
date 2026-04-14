const express = require("express")
const app = express()

const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")

const { connectDB, closeDB } = require("./config/db")
app.use(cookieParser());

connectDB();
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin
  if (requestOrigin) {
    res.header("Access-Control-Allow-Origin", requestOrigin)
  }
  res.header("Vary", "Origin")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    return res.sendStatus(204)
  }
  next()
})

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/users" ,require("./routes/users"))
app.use("/books" ,require("./routes/books"))
app.use("/category" ,require("./routes/category"))
app.use("/admin" ,require("./routes/admin"))
app.use("/carts" ,require("./routes/carts"))

app.use("/images",express.static("images"))

const PORT  = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.json({ message: "Server is live ..." });
});

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})

process.on("SIGINT", async () => {
  await closeDB()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  await closeDB()
  process.exit(0)
})
