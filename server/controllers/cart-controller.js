const Cart = require('../models/cart-model');

// Helper function to find a cart by userId
const findCartByUserId = async (userId) => {
    return await Cart.findOne({ userId }).populate('items.productId').lean(); // .lean() for faster read-only access
};

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        // console.log(userId, productId, quantity);

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ success: true, cart, message: "Item Added To Cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding item to cart', error });
    }
};

// Get Cart with Total Price
const getCartWithTotalPrice = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ success: false, message: 'UserId is required' });
        }

        const cart = await findCartByUserId(userId);        

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const cartWithTotalPrice = cart.items.map(item => ({
            productImage: item.productId.productfile.url,
            productId: item.productId._id,
            name: item.productId.productname,
            price: item.productId.price,
            quantity: item.quantity,
            totalPrice: item.productId.price * item.quantity,
            sku:item.productId.sku,
            model: item.productId.model,
        }));

        const totalCartPrice = cartWithTotalPrice.reduce((acc, item) => acc + item.totalPrice, 0);
        
        res.status(200).json({
            success: true,
            items: cartWithTotalPrice,
            totalCartPrice
        });
    } catch (error) {
        // console.error("Error fetching cart:", error.message);
        res.status(500).json({ success: false, message: 'Error fetching cart', error: error.message });
    }
};


// Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId } }, updatedAt: Date.now() },
            { new: true }
        );

        if (cart) {
            res.status(200).json({ success: true, cart, message: "Item Removed From Cart" });
        } else {
            res.status(404).json({ success: false, message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing item from cart', error });
    }
};

// Update Cart Quantity
const updateCartQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ success: false, message: 'Quantity must be greater than zero' });
        }

        const cart = await Cart.findOne({ userId });
        if (cart) {
            const item = cart.items.find(item => item.productId.toString() === productId);
            if (item) {
                item.quantity = quantity;
                cart.updatedAt = Date.now();
                await cart.save();
                res.status(200).json({ success: true, cart });
            } else {
                res.status(404).json({ success: false, message: 'Item not found in cart' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating cart quantity', error });
    }
};

// Reset Cart
const resetCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOneAndDelete({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Nothing In Cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting cart', error: error.message });
    }
};


module.exports = {
    addToCart,
    getCartWithTotalPrice,
    removeFromCart,
    updateCartQuantity,
    resetCart
};
