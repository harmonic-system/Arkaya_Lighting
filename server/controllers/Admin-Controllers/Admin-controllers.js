const Auth = require("../../models/auth-model")
const Contact = require("../../models/contact-models")
const NewsLetter = require("../../models/newsLetter-models")
const ProductQuery = require("../../models/productQuery-models")

const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find().select("-password -confirmPassword");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({data:users});
  } catch (error) {
    // console.error("Error fetching users:", error); // Logging the error for debugging
    return res.status(500).json({ message: "An error occurred while retrieving users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Auth.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // console.error("Error deleting user:", error); // Log the error for debugging
    return res.status(500).json({ message: "Unable to delete user, please try again later" });
  }
};


const getAllContacts = async (_, res) => {

  try {
    const contacts = await Contact.find()
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" })
    }

    return res.status(200).json({data:contacts})

  } catch (error) {
    return res.status(500).json({ message: "An error occurred while retrieving contacts" })
  }
}

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.deleteOne({ _id: id })
    if (deletedContact) {
      return res.status(200).json({ message: "Contact Deleted Successfully" })
    }
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete query, please try again later" });
  }
}

const getAllNewsLetter = async (_, res) => {

  try {
    const newsLetters = await NewsLetter.find()
    if (!newsLetters || newsLetters.length === 0) {
      return res.status(404).json({ message: "No NewsLetter Found" })
    }

    return res.status(200).json({data:newsLetters})

  } catch (error) {
    return res.status(500).json({ message: "An error occurred while retrieving newsletters" })
  }
}

const deleteNewsLetter = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNewsLetter = await NewsLetter.deleteOne({ _id: id })
    if (deletedNewsLetter) {
      return res.status(200).json({ message: "NewsLetter Deleted Successfully" })
    }
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete newsletter, please try again later" }) 
  }
}

const getAllProductQuery = async (_, res) => {

  try {
    const productqueries = await ProductQuery.find()
    if (!productqueries || productqueries.length === 0) {
      return res.status(404).json({ message: "No Product Querry Found" })
    }

    return res.status(200).json({data:productqueries})

  } catch (error) {
    return res.status(500).json({ message: "An error occurred while retrieving productquery" })
  }
}

const deleteProductQuery = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProductQuery = await ProductQuery.deleteOne({ _id: id })
    if (deletedProductQuery) {
      return res.status(200).json({ message: "Product Query Deleted Successfully" })
    }
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete productquery, please try again later" })
  }
}

module.exports = { getAllUsers, deleteUser, getAllContacts, deleteContact, getAllNewsLetter, deleteNewsLetter, getAllProductQuery, deleteProductQuery }