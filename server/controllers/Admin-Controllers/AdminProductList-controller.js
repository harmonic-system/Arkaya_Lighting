const ProductList = require("../../models/productList-model");
const cloudinary = require("../../utils/cloudinary")

const addSingleProduct = async (req, res) => {
    const {
        productfile,
        productname,
        model,
        sku,
        IndoorOutdoor,
        price,
        productCategory,
        featured,
        des,
        keywords
    } = req.body;

    // console.log(productfile,
    //     productname,
    //     model,
    //     sku,
    //     IndoorOutdoor,
    //     price,
    //     productCategory,
    //     featured,
    //     des,
    //     keywords );

    try {
        // Upload product image to Cloudinary
        const uploadOptions = {
            folder: "arkayalighting/products",
            resource_type: "auto",
            width: 400,
            height: 300,
        };
        const result = await cloudinary.uploader.upload(productfile, uploadOptions);
        // console.log(result);


        // Create new product instance
        const productData = {
            productfile: {
                public_id: result.public_id,
                url: result.secure_url,
            },
            productname,
            sku,
            model,
            IndoorOutdoor,
            price,
            productCategory,
            featured,
            des,
            keywords
        };

        // console.log(productData);


        const product = new ProductList(productData);
        // console.log(product);

        await product.save();

        return res.status(201).json({
            message: "Product created successfully",
        });
    } catch (error) {
        //   console.error("Error creating Connector Product:", error);
        return res.status(500).json({ message: "Unable to add product, please try again later" });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve the product by ID
        const product = await ProductList.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // console.log(product);

        return res.status(200).json({ data: product });
    } catch (error) {
        //   console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};


const updateSingalProduct = async (req, res) => {
    const { id } = req.params; // Extracting product ID from request parameters
    const {
        productfile,
        imgpublicid,
        productname,
        sku,
        model,
        IndoorOutdoor,
        price,
        productCategory,
        featured,
        des,
        keywords
    } = req.body;

    // console.log(
    //     productfile,
    //     imgpublicid,
    //     productname,
    //     model,
    //     sku,
    //     IndoorOutdoor,
    //     price,
    //     productCategory,
    //     featured,
    //     des,
    //     keywords
    // );

    try {
        let updatedProduct;

        // Check if productfile URL is from Cloudinary
        if (productfile.startsWith("https://res.cloudinary.com/arkaya")) {
            // Update product if existing Cloudinary image URL is used
            updatedProduct = await ProductList.findByIdAndUpdate(
                id,
                {
                    productfile: { public_id: imgpublicid, url: productfile },
                    productname,
                    sku,
                    model,
                    IndoorOutdoor,
                    price,
                    productCategory,
                    featured,
                    des,
                    keywords
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
            updatedProduct = await ProductList.findByIdAndUpdate(
                id,
                {
                    productfile: { public_id: result.public_id, url: result.secure_url },
                    productname,
                    sku,
                    IndoorOutdoor,
                    price,
                    productCategory,
                    featured,
                    des,
                    keywords
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

const deleteSingalProduct = async (req, res) => {
    const { id } = req.params;
    try {

        const deletedProduct = await ProductList.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        return res.status(200).json({ message: "Product Deleted Successfully" })
    } catch (error) {
        //   console.error("Error deleting application:", error); // Logs error for debugging
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
}

module.exports = { addSingleProduct, getSingleProduct, updateSingalProduct, deleteSingalProduct };