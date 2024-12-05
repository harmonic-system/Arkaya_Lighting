const express = require('express');
const { getWishList, addToWishList, removeFromWishList, resetWishList } = require('../controllers/wishlist-controller');
const authMiddleware = require('../middleware/auth-middleware');

const wishListRouter = express.Router();

// Route for fetching the cart with total price
wishListRouter.get('/getwishlist', authMiddleware, getWishList);

// Route for adding items to the cart
wishListRouter.post('/add', authMiddleware, addToWishList);

// Route for removing an item from the cart
wishListRouter.post('/remove', authMiddleware, removeFromWishList);

// Route for resetting the cart
wishListRouter.delete('/reset', authMiddleware, resetWishList);

module.exports = wishListRouter;