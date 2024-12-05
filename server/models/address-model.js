const { Schema, model } = require("mongoose")

const addressListSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    addressEmail: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    street: {
        type: String,
        trim: true,
    },
    zip: {
        type: String,
    },
});

const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    items: [addressListSchema],
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Address = new model("Address", addressSchema);

module.exports = Address;