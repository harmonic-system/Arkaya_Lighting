const ThemeCategory = require("../../models/themeCategory-models");
const cloudinary = require("../../utils/cloudinary")

const addThemeCategory = async (req, res) => {
    const { themeCategoryFile, title, des, } = req.body;

    if (!themeCategoryFile || !title || !des) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const uploadOptions = {
            folder: "arkayalighting/ThemeCategory",
            resource_type: 'auto',
        };

        const { public_id, secure_url } = await cloudinary.uploader.upload(themeCategoryFile, uploadOptions);

        const themeCategoryData = {
            themeCategoryFile: { public_id, url: secure_url },
            title,
            des
        };

        const newThemeCategory = new ThemeCategory(themeCategoryData);
        await newThemeCategory.save();

        return res.status(201).json({ message: "ThemeCategory created successfully" });

    } catch (error) {
        //   console.error("Error creating patner:", error); // Logs the error for debugging
        return res.status(500).json({ message: "Unable to add Theme Category, please try again later" });
    }
};


const getSingalThemeCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const themeCategory = await ThemeCategory.findById(id);
        if (!themeCategory) {
            return res.status(404).json({ message: "ThemeCategory not found" });
        }

        return res.status(200).json({ data: themeCategory });
    } catch (error) {
        //   console.error("Error fetching patner:", error); // Logs the error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

const updateSingalThemeCategory = async (req, res) => {
    const { id } = req.params;
    const { themeCategoryFile, imgpublicid, title, des, } = req.body;

    try {
        let updatedThemeCategory;

        // Check if image URL is from Cloudinary
        if (themeCategoryFile.startsWith("https://res.cloudinary.com/arkaya")) {
            // Update patner if existing Cloudinary image URL is used
            updatedThemeCategory = await ThemeCategory.findByIdAndUpdate(
                id,
                { themeCategoryFile: { public_id: imgpublicid, url: themeCategoryFile }, title, des, },
                { new: true }
            );
        } else {
            // Remove old Cloudinary image
            const deletedImg = await cloudinary.uploader.destroy(imgpublicid);
            if (!deletedImg) {
                return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(themeCategoryFile, {
                folder: "arkayalighting/ThemeCategory",
                resource_type: "auto",
            });

            // Update patner with new image data
            updatedThemeCategory = await ThemeCategory.findByIdAndUpdate(
                id,
                { themeCategoryFile: { public_id: result.public_id, url: result.secure_url }, title, des },
                { new: true }
            );
        }

        if (!updatedThemeCategory) {
            return res.status(404).json({ message: "ThemeCategory not found" });
        }
        return res.status(200).json({ message: "ThemeCategory updated successfully" });
    } catch (error) {
        // console.error("Error updating patner:", error); // Logs error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};


const deleteSingalThemeCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPatner = await ThemeCategory.findByIdAndDelete(id);

        if (!deletedPatner) {
            return res.status(404).json({ message: "ThemeCategory not found" });
        }

        return res.status(200).json({ message: "ThemeCategory deleted successfully" });
    } catch (error) {
        //   console.error("Error deleting patner:", error); // Logs error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

module.exports = { addThemeCategory, getSingalThemeCategory, updateSingalThemeCategory, deleteSingalThemeCategory }