const Application = require("../../models/application-models")
const cloudinary = require("../../utils/cloudinary")

const addApplication = async (req, res) => {
    const { applicationfile, heading, about } = req.body;

    if (!applicationfile || !heading || !about) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const uploadOptions = {
            folder: "arkayalighting/application",
            resource_type: 'auto',
            width: 300,
            height: 200,
        };

        const { public_id, secure_url } = await cloudinary.uploader.upload(applicationfile, uploadOptions);

        const applicationData = {
            applicationfile: { public_id, url: secure_url },
            heading,
            about,
        };

        const newApplication = new Application(applicationData);
        await newApplication.save();

        return res.status(201).json({ message: "Application created successfully" });

    } catch (error) {
        //   console.error("Error creating application:", error); // Logs the error for debugging
        return res.status(500).json({ message: "Unable to add application, please try again later" });
    }
};


const getSingleApplication = async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        return res.status(200).json({ data: application });
    } catch (error) {
        //   console.error("Error fetching application:", error); // Logs the error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

const updateApplication = async (req, res) => {
    const { id } = req.params;
    const { applicationfile, imgpublicid, heading, about } = req.body;

    try {
        let updatedApplication;

        // Check if image URL is from Cloudinary
        if (applicationfile.startsWith("https://res.cloudinary.com/arkaya")) {
            // Update application if existing Cloudinary image URL is used
            updatedApplication = await Application.findByIdAndUpdate(
                id,
                { applicationfile: { public_id: imgpublicid, url: applicationfile }, heading, about },
                { new: true }
            );
        } else {
            // Remove old Cloudinary image
            const deletedImg = await cloudinary.uploader.destroy(imgpublicid);
            if (!deletedImg) {
                return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(applicationfile, {
                folder: "arkayalighting/application",
                resource_type: "auto",
                width: 300,
                height: 200,
            });

            // Update application with new image data
            updatedApplication = await Application.findByIdAndUpdate(
                id,
                { applicationfile: { public_id: result.public_id, url: result.secure_url }, heading, about },
                { new: true }
            );
        }

        if (!updatedApplication) {
            return res.status(404).json({ message: "Application not found" });
        }
        return res.status(200).json({ message: "Application updated successfully" });
    } catch (error) {
        // console.error("Error updating application:", error); // Logs error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};


const deleteApplication = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
            return res.status(404).json({ message: "Application not found" });
        }

        return res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        //   console.error("Error deleting application:", error); // Logs error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

module.exports = { addApplication, getSingleApplication, updateApplication, deleteApplication }