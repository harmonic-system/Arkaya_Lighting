const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const { getAllAddresses, addAddress, getSingleAddress, updateAddress, deleteAddress } = require("../controllers/address-controller");
const addressRouter = express.Router();


addressRouter.get("/getalladdress", authMiddleware, getAllAddresses);
addressRouter.post("/addaddress", authMiddleware, addAddress);
addressRouter.get("/getSingleAddress/:addressId", authMiddleware, getSingleAddress);
addressRouter.put("/updateAddress/:addressId", authMiddleware, updateAddress);
addressRouter.delete("/deleteAddress/:addressId", authMiddleware, deleteAddress);

module.exports = addressRouter;