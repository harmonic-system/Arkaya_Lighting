const { Schema, model } = require("mongoose")

const newsLetterSchema = new Schema({
  newsletteremail: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})

const NewsLetter = new model("NewsLetter", newsLetterSchema)

module.exports = NewsLetter