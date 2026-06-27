const express = require("express")
const app = express()

const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")

const { connectDB, closeDB } = require("./config/db")

const requiredEnvVars = ["SECRET_KEY"]
const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar] || !process.env[envVar].trim()
)

if (missingEnvVars.length) {
  console.warn(
    `Warning: Missing environment variable(s): ${missingEnvVars.join(
      ", "
    )}. Add them to Vercel's Environment Variables settings.`
  )
}

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


const PORT  = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.json({ message: "Server is live ..." });
});

app.use((err, req, res, next) => {
  console.error("Unhandled application error:", err)

  if (res.headersSent) {
    return next(err)
  }

  const statusCode =
    Number.isInteger(err?.statusCode) ? err.statusCode :
    Number.isInteger(err?.status) ? err.status : 500

  const message =
    statusCode >= 500 ? "Internal server error" : err?.message || "Request failed"

  return res.status(statusCode).json({ message })
})

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

module.exports = app

