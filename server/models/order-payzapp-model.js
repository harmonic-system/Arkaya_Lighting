// models/Order.js
const mongoose = require("mongoose");

const OrderSchemaPayzapp = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction", required: true },
    items: [{ name: String, quantity: Number, price: Number }],
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["processing", "shipped", "delivered"], default: "processing" },
    createdAt: { type: Date, default: Date.now },
});

const OrderPayzapp = mongoose.model("OrderPayzapp", OrderSchemaPayzapp);

module.exports = OrderPayzapp;