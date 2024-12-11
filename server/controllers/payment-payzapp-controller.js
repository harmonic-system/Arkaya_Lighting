// controllers/paymentController.js
const crypto = require("crypto");
const TransactionPayzapp = require("../models/transaction-payzapp-model");
const OrderPayzapp = require("../models/order-payzapp-model");
const { initiatePaymentUtils, verifyPaymentUtils } = require("../utils/payzapp");

const initiatePayment = async (req, res) => {
    try {
        const { amount, address } = req.body;
        const user = req.user._id;
        // console.log(amount, address);

        // Create a transaction entry
        const transaction = await TransactionPayzapp.create({
            user,
            amount,
            address,
            paymentMethod: "PayZapp",
            status: "pending",
        });

        // Initiate payment with PayZapp
        const paymentResponse = await initiatePaymentUtils(transaction._id, amount);

        res.status(200).json({
            success: true,
            transactionId: transaction._id,
            paymentUrl: paymentResponse.paymentUrl,
        });
    } catch (err) {
        // console.error(err.message, "initiatePayment");
        res.status(500).json({ success: false, error: "Payment initiation failed" });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { transactionId, signature, items } = req.body;
        const transaction = await TransactionPayzapp.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ success: false, error: "Transaction not found" });
        }

        const isValid = verifyPaymentUtils(transactionId, signature);

        if (isValid) {
            transaction.status = "success";
            await transaction.save();

            // Create an order
            const order = await OrderPayzapp.create({
                user: transaction.user,
                transaction: transaction._id,
                items,
                address: transaction.address,
                totalAmount: transaction.amount,
            });

            res.status(200).json({ success: true, message: "Payment successful", order });
        } else {
            transaction.status = "failed";
            await transaction.save();
            res.status(400).json({ success: false, error: "Payment verification failed" });
        }
    } catch (err) {
        // console.error(err.message, "Verify payment");
        res.status(500).json({ success: false, error: "Payment verification failed" });
    }
};

module.exports = { initiatePayment, verifyPayment };