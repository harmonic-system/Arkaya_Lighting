const { Schema, model } = require("mongoose");

const patnersSchema = new Schema({
    technologypatnerfile: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    name: {
        type: String,
        required: true
    },
    des: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
})

const Patner = model("Patner", patnersSchema)

module.exports = Patner