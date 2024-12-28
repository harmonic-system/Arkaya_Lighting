const { Schema, model } = require("mongoose")

const CartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
}, {
    _id: false
});

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    items: [CartItemSchema],
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Cart = new model("Cart", CartSchema);

module.exports = Cart;

