require('dotenv').config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./Database/connectDB")
const authRoute = require('./routes/auth-routes')
const contactRoutes = require("./routes/contact-routes")
const productRoutes = require("./routes/products-routes")
const errormiddleware = require('./middleware/error-middleware')

const adminRoutes = require("./routes/Admin-Routes/admin-routes")

const app = express()

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(cors(corsOption))
app.use(express.json())

const PORT = 4000

app.get("/", (_, res) => {
  res.send("Welcome To Arkaya Lighting System,<br><br>Server Is Running.........")
})

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/normal", contactRoutes)
app.use("/api/v1/products", productRoutes)

app.use("/api/v1/admin", adminRoutes)

app.use(errormiddleware)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
  })
})

