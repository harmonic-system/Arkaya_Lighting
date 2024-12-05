const Product = require("../../models/product-models");
const cloudinary = require("../../utils/cloudinary")

const addSingleProduct1 = async (req, res) => {
    const {
        productfile,
        productname,
        sku,
        IndoorOutdoor,
        price,
        productCategory,
        featured,
        des,
        moduleSize,
        pixelPitch,
        pixelDensity,
        configuration,
        mode,
        resolution,
        driveType,
        refFreq,
        scanMode,
        portType,
        brightness,
        renFix,
        spec1, spec2, spec3, spec4, spec5,
        spec6, spec7, spec8, spec9, spec10,
    } = req.body;

    // console.log(productfile,
    //     productname,
    //     sku,
    //     IndoorOutdoor,
    //     price,
    //     productCategory,
    //     featured,
    //     des,
    //     moduleSize,
    //     pixelPitch,
    //     pixelDensity,
    //     configuration,
    //     mode,
    //     resolution,
    //     driveType,
    //     refFreq,
    //     scanMode,
    //     portType,
    //     brightness,
    //     renFix,
    //     spec1, spec2, spec3, spec4, spec5,
    //     spec6, spec7, spec8, spec9, spec10,);


    try {
        // Upload product image to Cloudinary
        const uploadOptions = {
            folder: "arkayalighting/products",
            resource_type: "auto",
            width: 400,
            height: 300,
        };
        const result = await cloudinary.uploader.upload(productfile, uploadOptions);

        // Create new product instance
        const productData = {
            productfile: {
                public_id: result.public_id,
                url: result.secure_url,
            },
            productname,
            sku,
            IndoorOutdoor,
            price,
            productCategory,
            featured,
            description: {
                des,
                moduleSize,
                pixelPitch,
                pixelDensity,
                configuration,
                mode,
                resolution,
                driveType,
                refFreq,
                scanMode,
                portType,
                brightness,
                renFix,
                spec1, spec2, spec3, spec4, spec5,
                spec6, spec7, spec8, spec9, spec10,
            }
        };

        const product = new Product(productData);
        await product.save();

        return res.status(201).json({
            message: "Product created successfully",
        });
    } catch (error) {
        //   console.error("Error creating Connector Product:", error);
        return res.status(500).json({ message: "Unable to add product, please try again later" });
    }
};



const getSingleProduct1 = async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ data: product });
    } catch (error) {
        //   console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};



const updateSingalProduct1 = async (req, res) => {
    const { id } = req.params; // Extracting product ID from request parameters
    const {
        productfile,
        imgpublicid,
        productname,
        sku,
        IndoorOutdoor,
        price,
        productCategory,
        featured,
        des,
        moduleSize,
        pixelPitch,
        pixelDensity,
        configuration,
        mode,
        resolution,
        driveType,
        refFreq,
        scanMode,
        portType,
        brightness,
        renFix,
        spec1, spec2, spec3, spec4, spec5,
        spec6, spec7, spec8, spec9, spec10,
    } = req.body;

    try {
        let updatedProduct;

        // Check if productfile URL is from Cloudinary
        if (productfile.startsWith("https://res.cloudinary.com/arkaya")) {
            // Update product if existing Cloudinary image URL is used
            updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                    productfile: { public_id: imgpublicid, url: productfile },
                    productname,
                    sku,
                    IndoorOutdoor,
                    price,
                    productCategory,
                    featured,
                    description: {
                        des,
                        moduleSize,
                        pixelPitch,
                        pixelDensity,
                        configuration,
                        mode,
                        resolution,
                        driveType,
                        refFreq,
                        scanMode,
                        portType,
                        brightness,
                        renFix,
                        spec1, spec2, spec3, spec4, spec5,
                        spec6, spec7, spec8, spec9, spec10,
                    }
                },
                { new: true } // Return the updated document
            );
        } else {
            // Remove old Cloudinary image
            const deletedImg = await cloudinary.uploader.destroy(imgpublicid);
            if (!deletedImg) {
                return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(productfile, {
                folder: "arkayalighting/products",
                resource_type: "auto",
                width: 400,
                height: 300,
            });

            // Update product with new image data
            updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                    productfile: { public_id: result.public_id, url: result.secure_url },
                    productname,
                    sku,
                    IndoorOutdoor,
                    price,
                    productCategory,
                    featured,
                    description: {
                        des,
                        moduleSize,
                        pixelPitch,
                        pixelDensity,
                        configuration,
                        mode,
                        resolution,
                        driveType,
                        refFreq,
                        scanMode,
                        portType,
                        brightness,
                        renFix,
                        spec1, spec2, spec3, spec4, spec5,
                        spec6, spec7, spec8, spec9, spec10,
                    }
                },
                { new: true } // Return the updated document
            );
        }

        // Check if product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        // console.error("Error updating product:", error); // Log error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

const deleteSingalProduct1 = async (req, res) => {
    const { id } = req.params;
    try {

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        return res.status(200).json({ message: "Product Deleted Successfully" })
    } catch (error) {
        //   console.error("Error deleting application:", error); // Logs error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
}

module.exports = {
    addSingleProduct1, getSingleProduct1, updateSingalProduct1, deleteSingalProduct1
}