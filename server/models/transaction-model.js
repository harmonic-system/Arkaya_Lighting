const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth', // Reference to the Auth model
    },
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String
    },
    signature: {
        type: String
    },
    items: [
        {
            productImage: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
    ],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth', // Reference to the Auth model
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction;

