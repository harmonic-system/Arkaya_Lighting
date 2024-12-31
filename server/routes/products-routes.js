const express = require("express")
const { getapplication, gethomecarousel, getproducts, getsingleproducts, getpatners, getthemeCategory } = require("../controllers/products-controllers")

const productRoutes = express.Router()

productRoutes.route("/getapplication").get(getapplication)
productRoutes.route("/gethomecarousel").get(gethomecarousel)
productRoutes.route("/getproducts").get(getproducts)
productRoutes.route("/getpatners").get(getpatners)
productRoutes.route("/getthemeCategory").get(getthemeCategory)
productRoutes.route("/getsingleproducts/:id").get(getsingleproducts)

module.exports = productRoutes