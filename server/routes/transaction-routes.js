// Rajorpay

const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const { createTransaction, verifyTransaction } = require("../controllers/transactions-controller");

const transactionRoutes = express.Router();

// Route to create Razorpay order
transactionRoutes.post("/payment", authMiddleware, createTransaction);

// Route to verify Razorpay payment
transactionRoutes.post("/verify", authMiddleware, verifyTransaction);

module.exports = transactionRoutes;



// routes/paymentRoutes.js
// const express = require("express");
// const authMiddleware = require("../middleware/auth-middleware");
// const { initiatePayment, verifyPayment } = require("../controllers/payment-payzapp-controller");
// const transactionRoutes = express.Router();

// transactionRoutes.post("/initiate", authMiddleware, initiatePayment);
// transactionRoutes.post("/verify", authMiddleware, verifyPayment);

// module.exports = transactionRoutes;