const { Schema, model } = require("mongoose")

const productQuerySchema = new Schema({

  productCode: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  productSku: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  organization: {
    type: String,
  },

  query: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})

const ProductQuery = model("ProductQuery", productQuerySchema)

module.exports = ProductQuery


