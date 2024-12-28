// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Auth', // Reference to the Auth model
//         required: true
//     }, // Replace with actual user ID logic
//     orderAddress: {
//         type: Object,
//         required: true
//     },
//     totalAmount: {
//         type: Number,
//         required: true
//     },
//     paymentStatus: {
//         type: String,
//         default: "Pending"
//     },
// }, {
//     timestamps: true, // Automatically adds createdAt and updatedAt fields
// }
// );

// const Order = mongoose.model("Order", orderSchema)

// module.exports = Order;


const { Schema, model } = require("mongoose")

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    }, // Reference to Auth model
    orderAddress: {
        type: Object,
        required: true
    }, // Address of the order
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
    totalAmount: {
        type: Number,
        required: true
    }, // Total amount of the order
    status: {
        type: String,
        default: "Processing"
    }, // Order status
    paymentStatus: {
        type: String,
        default: "Pending"
    }, // Payment status
    trackingId: {
        type: String
    },
    deliveryDate: {
        type: Date
    },
}, {
    timestamps: true
});

const Order = model("Order", orderSchema)

module.exports = Order;

