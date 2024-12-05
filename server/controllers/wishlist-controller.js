const WishList = require('../models/wishlist-model');

// Helper function to find a WishList by userId
const findWishListByUserId = async (userId) => {
    return await WishList.findOne({ userId }).populate('items.productId').lean(); // .lean() for faster read-only access
};

// Add to WishList
const addToWishList = async (req, res) => {
    try {
        const { productId } = req.body;
        // console.log(productId);

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }

        let wishlist = await WishList.findOne({ userId: req.user._id });
        if (!wishlist) {
            wishlist = new WishList({ userId: req.user._id, items: [] });
        }

        const existingItem = wishlist.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            return res.status(400).json({ success: false, message: 'Already in WishList' });
        } else {
            wishlist.items.push({ productId });
        }
        await wishlist.save();
        res.status(200).json({ success: true, message: "Item Added To WishList" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding item to WishList', error });
    }
};

// Get WishList
const getWishList = async (req, res) => {

    try {
        // console.log(req.user._id.toString());

        const wishlist = await findWishListByUserId(req.user._id.toString());

        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'Wishlist not found' });
        }

        const getAllWishListOfUser = wishlist.items.map(item => ({
            productImage: item.productId.productfile.url,
            productId: item.productId._id,
            name: item.productId.productname,
            price: item.productId.price,
            sku: item.productId.sku
        }));        

        res.status(200).json({
            success: true,
            items: getAllWishListOfUser,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching WishList', error });
    }
};

// Remove from WishList
const removeFromWishList = async (req, res) => {
    try {
        const { productId } = req.body;

        const wishlist = await WishList.findOneAndUpdate(
            { userId: req.user._id },
            { $pull: { items: { productId } } },
            { new: true }
        );

        if (wishlist) {
            res.status(200).json({ success: true, message: "Item Removed From WishList" });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing item from WishList', error });
    }
};

// Reset WishList
const resetWishList = async (req, res) => {
    try {
        const wishlist = await WishList.findOneAndDelete({ userId: req.user._id });

        if (!wishlist) {
            return res.status(404).json({ message: 'WishList not found' });
        }
        res.status(200).json({ message: 'Nothing In WishList' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting WishList', error: error.message });
    }
};


module.exports = {
    addToWishList,
    getWishList,
    removeFromWishList,
    resetWishList
};
