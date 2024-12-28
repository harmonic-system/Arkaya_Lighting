const Application = require("../models/application-models")
const HomeCarousel = require("../models/homeCarousel-models")
const Product = require("../models/products-model")

const getapplication = async (_, res) => {
  try {
    const application = await Application.find()
    if (!application || application.length === 0) {
      return res.status(100).json({ message: "No Application Found" })
    }
    return res.status(200).json({ data: application })
  } catch (error) {
    return res.status(400).json({ message: error, data: [] })
  }
}

const gethomecarousel = async (_, res) => {
  try {
    const carousels = await HomeCarousel.find()
    if (!carousels || carousels.length === 0) {
      return res.status(100).json({ message: "No Home Carousels Found" })
    }
    return res.status(200).json({ data: carousels })
  } catch (error) {
    return res.status(400).json({ message: error, data: [] })
  }
}

const getproducts = async (_, res) => {
  try {
    const products = await Product.find()
    if (!products) {
      return res.status(404).json({ message: 'Product not found', data: [] })
    }
    return res.status(200).json({ data: products, })
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product', error: error.message })
  }
}

const getsingleproducts = async (req, res) => {
  const { id } = req.params;  // Destructuring id from req.params
  try {
    // Fetch the product by its ID
    const singleProduct = await Product.findById(id);

    if (!singleProduct) {
      // If no product found, return a 404 status code with a message
      return res.status(404).json({ message: 'Product not found', data: [] });
    }

    // If product is found, return it with a 200 status
    return res.status(200).json({ data: singleProduct });

  } catch (error) {
    // console.error(`Error fetching product: ${error.message}`);
    // If any error occurs, return a 500 status code with a detailed error message
    return res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
}

module.exports = { getapplication, gethomecarousel, getproducts, getsingleproducts }