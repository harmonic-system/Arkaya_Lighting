const { Schema, model } = require("mongoose")

const WishListItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "ProductList",
        required: true,
    },
}, {
    _id: false
});

const WishListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [WishListItemSchema],
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const WishList = new model("WishList", WishListSchema);

module.exports = WishList;
