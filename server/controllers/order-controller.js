const Order = require("../models/order-model");

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.status(200).json({ success: true, data :orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel Order
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOneAndDelete({ _id: orderId, userId: req.user._id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order canceled successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllOrders,
    cancelOrder,
};
