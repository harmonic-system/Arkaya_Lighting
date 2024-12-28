// models/Transaction.js
const { Schema, model } = require("mongoose")

const TransactionSchemaPayzapp = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        unique: true
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const TransactionPayzapp = model("TransactionPayzapp", TransactionSchemaPayzapp);

module.exports = TransactionPayzapp;