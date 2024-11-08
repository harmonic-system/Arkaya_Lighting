const express = require("express")
const { contactPageController, productQuery, newsLetter } = require("../controllers/contact-controllers")

const contactRoutes = express.Router()

contactRoutes.route("/contact").post(contactPageController)
contactRoutes.route("/productquery").post(productQuery)
contactRoutes.route("/newsletter").post(newsLetter)

module.exports = contactRoutes

