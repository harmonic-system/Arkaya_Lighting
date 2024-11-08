const express = require("express")
const { getapplication, gethomecarousel, getproducts, getsingleproducts } = require("../controllers/products-controllers")

const productRoutes = express.Router()

productRoutes.route("/getapplication").get(getapplication)
productRoutes.route("/gethomecarousel").get(gethomecarousel)
productRoutes.route("/getproducts").get(getproducts)
productRoutes.route("/getsingleproducts/:id").get(getsingleproducts)

module.exports = productRoutes