const express = require('express');
const { addToCart, getCartWithTotalPrice, updateCartQuantity, removeFromCart, resetCart } = require('../controllers/cart-controller');

const cartRouter = express.Router();

// Route for adding items to the cart
cartRouter.post('/add', addToCart);

// Route for fetching the cart with total price
cartRouter.get('/getcart/:userId', getCartWithTotalPrice);

// Route for updating the quantity of an item in the cart
cartRouter.put('/update', updateCartQuantity);

// Route for removing an item from the cart
cartRouter.post('/remove', removeFromCart);

// Route for resetting the cart
cartRouter.delete('/reset/:userId', resetCart);

module.exports = cartRouter;
