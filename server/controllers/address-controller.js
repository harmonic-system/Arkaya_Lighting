const Address = require("../models/address-model");

// Get all addresses for a user
const getAllAddresses = async (req, res) => {
    try {
        const { _id: userId } = req.user; // Extract userId from auth middleware
        const userAddresses = await Address.findOne({ userId });

        if (!userAddresses) {
            return res.status(404).json({ message: "No addresses found" });
        }

        res.status(200).json({ message: "Addresses retrieved successfully", data: userAddresses.items });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving addresses", error: error.message });
    }
};

// Add a new address for a user
const addAddress = async (req, res) => {
    const { _id: userId } = req.user;
    try {
        const { name, email, phone, address, state, city, country, street, zip } = req.body;

        // Check if email is valid and not null or empty
        if (!email || !email.trim()) {
            return res.status(400).json({ message: "Email is required and cannot be empty" });
        }

        // Optionally: Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        let userAddresses = await Address.findOne({ userId });

        if (!userAddresses) {
            // If no address document exists, create a new one
            userAddresses = new Address({
                userId: req.user._id,
                items: [
                    {
                        name,
                        addressEmail: email,
                        phone,
                        address,
                        state,
                        city,
                        country,
                        street,
                        zip
                    }
                ]
            });
        } else {
            // Add the new address to the existing document's 'items' array
            userAddresses.items.push({
                name,
                addressEmail: email,
                phone,
                address,
                state,
                city,
                country,
                street,
                zip
            });
        }

        // Save the address data to the database
        await userAddresses.save();
        res.status(201).json({ message: "Address added successfully" });

    } catch (error) {
        // console.error("Error adding address:", error);
        res.status(500).json({ message: "Error adding address", error: error.message });
    }
};



// Get a single address by address ID
const getSingleAddress = async (req, res) => {
    try {
        const { _id: userId } = req.user; // User ID from authMiddleware
        const { addressId } = req.params; // Address ID from request params

        // Find the user's address document
        const userAddresses = await Address.findOne({ userId });

        if (!userAddresses) {
            return res.status(404).json({ message: "No addresses found for this user" });
        }

        // Find the specific address by its ID
        const address = userAddresses.items.find(item => item._id.toString() === addressId);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json({ message: "Address retrieved successfully", data: address });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving address", error: error.message });
    }
};


// Update an address by address ID
const updateAddress = async (req, res) => {
    try {
        const { _id: userId } = req.user; // User ID from authMiddleware
        const { addressId } = req.params; // Address ID from request params
        const updatedData = req.body; // Updated data from request body

        // Find the user's address document
        const userAddresses = await Address.findOne({ userId });

        if (!userAddresses) {
            return res.status(404).json({ message: "No addresses found for this user" });
        }

        // Find the specific address by its ID and update it
        const addressIndex = userAddresses.items.findIndex(item => item._id.toString() === addressId);

        if (addressIndex === -1) {
            return res.status(404).json({ message: "Address not found" });
        }

        // Update the specific address
        userAddresses.items[addressIndex] = { ...userAddresses.items[addressIndex]._doc, ...updatedData };

        // Save the updated document
        await userAddresses.save();

        res.status(200).json({ message: "Address updated successfully", data: userAddresses.items[addressIndex] });
    } catch (error) {
        res.status(500).json({ message: "Error updating address", error: error.message });
    }
};


// Delete an address by its index
const deleteAddress = async (req, res) => {
    try {
        const { _id: userId } = req.user; // Extract userId from the authMiddleware
        const { addressId } = req.params; // Extract addressId from request params

        // Find and update the user's address list by removing the specific address
        const updatedUserAddresses = await Address.findOneAndUpdate(
            { userId }, // Find the document with the matching userId
            { $pull: { items: { _id: addressId } } }, // Remove the address with the specified _id
            { new: true } // Return the updated document
        );

        if (!updatedUserAddresses) {
            return res.status(404).json({ message: "Address not found or user has no addresses" });
        }

        res.status(200).json({ message: "Address deleted successfully", data: updatedUserAddresses });
    } catch (error) {
        res.status(500).json({ message: "Error deleting address", error: error.message });
    }
};



module.exports = { getAllAddresses, addAddress, getSingleAddress, updateAddress, deleteAddress }
