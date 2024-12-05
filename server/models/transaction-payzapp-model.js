// models/Transaction.js
const mongoose = require("mongoose");

const TransactionSchemaPayzapp = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

const TransactionPayzapp = mongoose.model("TransactionPayzapp", TransactionSchemaPayzapp);

module.exports = TransactionPayzapp;