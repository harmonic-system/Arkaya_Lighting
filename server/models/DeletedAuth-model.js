const { Schema, model } = require("mongoose");

// Define address schema
const addressSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    street: {
        type: String,
    },
    zip: {
        type: String,
    },
}, {
    timestamps: true,
});

// Define auth schema
const deletedAuthSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    organization: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
    role: {
        type: String,
    },
    term_condition: {
        type: Boolean,
    },
    // Include address schema as a subdocument array
    address: {
        type: [addressSchema],
        default: [],
    }
}, {
    timestamps: true,
});

const DeletedAuth = new model("DeletedAuth", deletedAuthSchema);

module.exports = DeletedAuth;
