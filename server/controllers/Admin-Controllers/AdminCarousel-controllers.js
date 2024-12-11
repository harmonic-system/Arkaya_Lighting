const HomeCarousel = require("../../models/homeCarousel-models");
const cloudinary = require("../../utils/cloudinary")

const addHomeCarousel = async (req, res) => {
  const { file, heading, description } = req.body;
  // console.log(file, heading, description);

  try {
    // Upload the file to Cloudinary
    const uploadOptions = {
      folder: "arkayalighting/home/carousel",
      resource_type: "auto",
      width: 2100,
      height: 720,
    };
    const { public_id, secure_url } = await cloudinary.uploader.upload(file, uploadOptions);

    const carouselData = {
      file: { public_id, url: secure_url },
      heading,
      description,
    }

    // Initialize a new carousel entry
    const carousel = new HomeCarousel(carouselData);

    // Save the carousel entry to the database
    await carousel.save();

    return res.status(201).json({
      message: "Home carousel created successfully",
    });
  } catch (error) {
    // console.error("Error creating home carousel:", error);
    return res.status(500).json({ message: "Unable to add home carousel, please try again later" });
  }
};

const getSingalHomeCarousel = async (req, res) => {
  const { id } = req.params;
  try {
    // console.log(id);
    const singlehomecarousel = await HomeCarousel.findById(id);
    if (!singlehomecarousel) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({ data: singlehomecarousel });
    // console.log(singleProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}

const updateHomeCarousel = async (req, res) => {
  const { id } = req.params;
  const { file, imgpublicid, heading, description } = req.body
  // console.log(file, imgpublicid, heading, description)
  try {
    let updatedHomeCarousel;
    if (file.startsWith("https://res.cloudinary.com/arkaya")) {

      updatedHomeCarousel = await HomeCarousel.findByIdAndUpdate(
        id,
        { file: { public_id: imgpublicid, url: file }, heading, description },
        { new: true }
      );
    } else {
      // Remove old Cloudinary image
      const deletedImg = await cloudinary.uploader.destroy(imgpublicid);
      if (!deletedImg) {
        return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(file, {
        folder: "arkayalighting/home/carousel",
        resource_type: "auto",
        width: 2100,
        height: 720,
      });

      // Update application with new image data
      updatedHomeCarousel = await HomeCarousel.findByIdAndUpdate(
        id,
        { file: { public_id: result.public_id, url: result.secure_url }, heading, description },
        { new: true }
      );
    }

    if (!updatedHomeCarousel) {
      return res.status(404).json({ message: "Home Carousel not found" });
    }
    return res.status(200).json({ message: "Home Carousel updated successfully" });
  }
  catch (error) {
    // console.error("Error updating home carousel:", error); // Logs error for debugging
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}

const deleteHomeCarousel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCarousel = await HomeCarousel.findByIdAndDelete(id);
    if (!deletedCarousel) {
      return res.status(200).json({ message: "Home Carousel not found" })
    }
    return res.status(200).json({ message: "Home Carousel Deleted Successfully" })
  } catch (error) {
    //   console.error("Error deleting application:", error); // Logs error for debugging
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}


module.exports = { addHomeCarousel, getSingalHomeCarousel, updateHomeCarousel, deleteHomeCarousel }
