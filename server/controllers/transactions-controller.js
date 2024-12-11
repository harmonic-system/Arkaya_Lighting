const Razorpay = require("razorpay");
const Transaction = require("../models/transaction-model");
const Order = require("../models/order-model");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
const createTransaction = async (req, res) => {
    const { amount, items, address } = req.body;

    if (!amount || !items || !Array.isArray(items) || items.length === 0 || !address) {
        return res.status(400).json({
            success: false,
            error: "Amount, Items, and Address are required.",
        });
    }

    try {
        // Razorpay order creation options
        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${new Date().getTime()}`,
            payment_capture: 1, // Auto-capture payment
        };

        // Create Razorpay order
        const order = await razorpay.orders.create(options);

        // Save transaction record in DB
        const transaction = new Transaction({
            orderId: order.id,
            userId: req.user._id, // Assuming user ID comes from auth middleware
            amount,
            status: "pending",
            items,
            address,
        });
        await transaction.save();

        // Send response with order details
        res.status(200).json({ success: true, orderId: order.id, amount: order.amount });
    } catch (error) {
        //   console.error("Error creating Razorpay order: ", error);
        res.status(500).json({ success: false, error: "Error creating Razorpay order" });
    }
};

// Verify Razorpay Payment
const verifyTransaction = async (req, res) => {
    const { paymentId, orderId, signature } = req.body;

    if (!paymentId || !orderId || !signature) {
        // console.log('Error: Missing required fields for verification');
        return res.status(400).json({ success: false, error: "Missing required payment verification fields" });
    }

    try {
        // Generate signature using HMAC SHA256
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest("hex");

        if (generatedSignature !== signature) {
            return res.status(400).json({ success: false, error: "Invalid payment signature." });
        }

        // Find the transaction
        const transaction = await Transaction.findOne({ orderId });

        if (!transaction) {
            return res.status(404).json({ success: false, error: "Transaction not found." });
        }

        if (transaction.status === "completed") {
            return res.status(400).json({ success: false, error: "Payment already verified." });
        }

        // Update transaction status to "completed"
        transaction.paymentId = paymentId;
        transaction.signature = signature;
        transaction.status = "completed";
        await transaction.save();

        // Create order record in the database
        const order = new Order({
            userId: transaction.userId, // Using userId from the transaction
            orderAddress: transaction.address, // Storing address
            items: transaction.items, // Items list
            totalAmount: transaction.amount, // Amount from transaction
            totalPrice: transaction.amount, // Maintaining consistency with totalPrice
            paymentStatus: "Paid", // Updating payment status
            status: "Processing", // Default order status
        });
        await order.save();

        // Send response that payment was successfully verified
        res.status(200).json({ success: true, message: "Payment verified and order created." });
    } catch (error) {
        // console.error("Error verifying payment: ", error);
        res.status(500).json({ success: false, error: "Payment verification failed." });
    }
};

module.exports = { createTransaction, verifyTransaction };









