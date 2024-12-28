const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
    applicationfile: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    heading: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
})

const Application = new model("Application", applicationSchema)

module.exports = Application