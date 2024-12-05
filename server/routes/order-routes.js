const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const { getAllOrders, cancelOrder } = require("../controllers/order-controller");
const orderRouter = express.Router();

orderRouter.get("/getorder", authMiddleware, getAllOrders);
orderRouter.delete("/cancelorder/:orderId", authMiddleware, cancelOrder);

module.exports = orderRouter;
