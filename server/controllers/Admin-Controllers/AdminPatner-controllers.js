const Patner = require("../../models/patners-model");
const cloudinary = require("../../utils/cloudinary")

const addPatner = async (req, res) => {
    const { technologypatnerfile, name, des, link } = req.body;

    if (!technologypatnerfile || !name || !link) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const uploadOptions = {
            folder: "arkayalighting/Technology Patners",
            resource_type: 'auto',
        };

        const { public_id, secure_url } = await cloudinary.uploader.upload(technologypatnerfile, uploadOptions);

        const patnerData = {
            technologypatnerfile: { public_id, url: secure_url },
            name,
            des,
            link,
        };

        const newPatner = new Patner(patnerData);
        await newPatner.save();

        return res.status(201).json({ message: "Patner created successfully" });

    } catch (error) {
        //   console.error("Error creating patner:", error); // Logs the error for debugging
        return res.status(500).json({ message: "Unable to add patner, please try again later" });
    }
};


const getSingalPatner = async (req, res) => {
    const { id } = req.params;

    try {
        const patner = await Patner.findById(id);
        if (!patner) {
            return res.status(404).json({ message: "Patner not found" });
        }

        return res.status(200).json({ data: patner });
    } catch (error) {
        //   console.error("Error fetching patner:", error); // Logs the error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

const updateSingalPatner = async (req, res) => {
    const { id } = req.params;
    const { technologypatnerfile, imgpublicid, name, des, link } = req.body;

    try {
        let updatedPatner;

        // Check if image URL is from Cloudinary
        if (technologypatnerfile.startsWith("https://res.cloudinary.com/arkaya")) {
            // Update patner if existing Cloudinary image URL is used
            updatedPatner = await Patner.findByIdAndUpdate(
                id,
                { technologypatnerfile: { public_id: imgpublicid, url: technologypatnerfile }, name, des, link },
                { new: true }
            );
        } else {
            // Remove old Cloudinary image
            const deletedImg = await cloudinary.uploader.destroy(imgpublicid);
            if (!deletedImg) {
                return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(technologypatnerfile, {
                folder: "arkayalighting/Technology Patners",
                resource_type: "auto",
            });

            // Update patner with new image data
            updatedPatner = await Patner.findByIdAndUpdate(
                id,
                { technologypatnerfile: { public_id: result.public_id, url: result.secure_url }, name, des, link },
                { new: true }
            );
        }

        if (!updatedPatner) {
            return res.status(404).json({ message: "Patner not found" });
        }
        return res.status(200).json({ message: "Patner updated successfully" });
    } catch (error) {
        // console.error("Error updating patner:", error); // Logs error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};


const deleteSingalPatner = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPatner = await Patner.findByIdAndDelete(id);

        if (!deletedPatner) {
            return res.status(404).json({ message: "Patner not found" });
        }

        return res.status(200).json({ message: "Patner deleted successfully" });
    } catch (error) {
        //   console.error("Error deleting patner:", error); // Logs error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

module.exports = { addPatner, getSingalPatner, updateSingalPatner, deleteSingalPatner }