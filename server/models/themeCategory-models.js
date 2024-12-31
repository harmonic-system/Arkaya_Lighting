const { Schema, model } = require("mongoose");

const themeCategorySchema = new Schema({
    themeCategoryFile: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    title: {
        type: String,
        required: true
    },
    des: {
        type: String,
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
})

const ThemeCategory = model("ThemeCategory", themeCategorySchema)

module.exports = ThemeCategory