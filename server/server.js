require('dotenv').config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./Database/connectDB")
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth-routes')
const contactRoutes = require("./routes/contact-routes")
const productRoutes = require("./routes/products-routes")
const addressRouter = require('./routes/address-routes');
const wishListRouter = require('./routes/wishlist-routes')
const cartRouter = require('./routes/cart-routes')
const errormiddleware = require('./middleware/error-middleware')

const adminRoutes = require("./routes/Admin-Routes/admin-routes");
const transactionRoutes = require('./routes/transaction-routes');
const orderRouter = require('./routes/order-routes');

const app = express()

const corsOption = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(bodyParser.json());
app.use(cors(corsOption))
app.use(express.json())

const PORT = 4000

app.get("/", (_, res) => {
  res.send("Welcome To Arkaya Lighting System,<br><br>Server Is Running.........")
})

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/normal", contactRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/address", addressRouter)
app.use("/api/v1/wishlist", wishListRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/order", orderRouter)

app.use("/api/v1/admin", adminRoutes)

app.use("/api/v1/transactions", transactionRoutes)

app.use(errormiddleware)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
  })
})



