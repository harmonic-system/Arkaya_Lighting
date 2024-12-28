import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ProductSpecificationDownload = ({ singleProduct }) => {
    const capitalizeFirstLetter = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A";
    };

    //    const downloadPDF = async () => {
    //         const doc = new jsPDF();
    //         const pageWidth = doc.internal.pageSize.width;

    //         // Create HTML structure dynamically
    //         const content = document.createElement("div");
    //         content.style.position = "relative"; // Added relative positioning
    //         content.style.padding = "30px"; // Increased padding
    //         content.style.margin = "10px"; // Added margin
    //         content.style.fontFamily = "Arial, sans-serif";
    //         content.style.textAlign = "left";
    //         content.style.lineHeight = "1.6"; // Better line spacing
    //         content.style.border = "10px solid #ddd"; // Light border
    //         content.style.borderRadius = "5px"; // Rounded corners
    //         content.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Shadow

    //         // Add Logo at the Top-Right Corner

    //         const logoUrl = ("../../../images/arkaya-logo-transformed.png")
    //         if (logoUrl) { // Assuming logo URL is passed in 'logoUrl'
    //             const logo = document.createElement("img");
    //             logo.src = logoUrl; // Logo URL
    //             logo.style.width = "220px"; // Adjust logo size
    //             logo.style.position = "absolute";
    //             logo.style.top = "20px"; // Position from top
    //             logo.style.right = "20px"; // Position from right
    //             logo.style.borderRadius = "5px"; // Rounded corners
    //             content.appendChild(logo);
    //         }

    //         // Product Image
    //         if (singleProduct.productfile?.url) {
    //             const img = document.createElement("img");
    //             img.src = singleProduct.productfile?.url;
    //             img.style.width = "300px";
    //             img.style.marginTop = "100px"; // Add margin to avoid overlapping logo
    //             img.style.marginBottom = "30px";
    //             img.style.borderRadius = "5px"; // Rounded corners for the image
    //             img.style.border = "1px solid #ddd";
    //             content.appendChild(img);
    //         }

    //         // Product Title
    //         const title = document.createElement("h2");
    //         title.innerText = singleProduct?.productname || "Product Name";
    //         title.style.fontSize = "30px";
    //         title.style.fontWeight = "bold";
    //         title.style.marginBottom = "20px"; // Add space below title
    //         title.style.color = "#333"; // Darker text color
    //         content.appendChild(title);

    //         // Product Details
    //         const details = `
    //             <p style="margin-bottom: 10px; font-size: 20px;">
    //                 <strong>Model:</strong> ${singleProduct?.model || "N/A"}
    //             </p>
    //             <p style="margin-bottom: 20px; font-size: 20px;">
    //                 <strong>SKU:</strong> ${singleProduct?.sku || "N/A"}
    //             </p>
    //             <p style="margin-bottom: 15px; font-size: 20px;">
    //                 <strong>Description:</strong> ${
    //                     singleProduct?.des?.description || "No description available."
    //                 }
    //             </p>
    //         `;
    //         content.innerHTML += details;

    //         // Specifications
    //         Object.keys(singleProduct.des || {}).forEach((key) => {
    //             if (key !== "description") {
    //                 content.innerHTML += `
    //                     <p style="margin-bottom: 20px; font-size: 20px;">
    //                         <strong>${capitalizeFirstLetter(key)}:</strong> ${
    //                     singleProduct.des[key]
    //                 }
    //                     </p>`;
    //             }
    //         });

    //         // ** Append content temporarily to DOM **
    //         document.body.appendChild(content); // Attach the content to DOM temporarily

    //         // Render content to canvas
    //         const canvas = await html2canvas(content, { scale: 2, useCORS: true });

    //         // Remove content from DOM after rendering
    //         document.body.removeChild(content);

    //         const imgData = canvas.toDataURL("image/png");
    //         const imgWidth = pageWidth - 20;
    //         const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //         // Add image to PDF
    //         doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    //         // Save the PDF
    //         doc.save(
    //             `${singleProduct?.productname || "Product"}-specifications.pdf`
    //         );
    //     };


       const downloadPDF = async () => {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;

            // Create HTML structure dynamically
            const content = document.createElement("div");
            content.style.position = "relative"; // Added relative positioning
            content.style.padding = "30px"; // Increased padding
            content.style.margin = "10px"; // Added margin
            content.style.fontFamily = "Arial, sans-serif";
            content.style.textAlign = "left";
            content.style.lineHeight = "1.6"; // Better line spacing
            content.style.border = "10px solid #ddd"; // Light border
            content.style.borderRadius = "5px"; // Rounded corners
            content.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Shadow

            // Add Logo at the Top-Right Corner

            const logoUrl = ("../../../images/arkaya-logo-transformed.png")
            if (logoUrl) { // Assuming logo URL is passed in 'logoUrl'
                const logo = document.createElement("img");
                logo.src = logoUrl; // Logo URL
                logo.style.width = "380px"; // Adjust logo size
                logo.style.position = "absolute";
                logo.style.top = "50px"; // Position from top
                logo.style.right = "50px"; // Position from right
                logo.style.borderRadius = "5px"; // Rounded corners
                content.appendChild(logo);
            }

            // Product Image
            if (singleProduct.productfile?.url) {
                const img = document.createElement("img");
                img.src = singleProduct.productfile?.url;
                img.style.width = "500px";
                img.style.height = "500px";
                img.style.marginTop = "180px"; // Add margin to avoid overlapping logo
                img.style.marginBottom = "30px";
                img.style.borderRadius = "5px"; // Rounded corners for the image
                img.style.border = "1px solid #ddd";
                content.appendChild(img);
            }

            // Product Title
            const title = document.createElement("h2");
            title.innerText = singleProduct?.productname || "Product Name";
            title.style.fontSize = "50px";
            title.style.fontWeight = "bold";
            title.style.marginBottom = "20px"; // Add space below title
            title.style.color = "#333"; // Darker text color
            content.appendChild(title);

            // Product Details
            const details = `
                <p style="margin-bottom: 15px; font-size: 40px;">
                    <strong>Model:</strong> ${singleProduct?.model || "N/A"}
                </p>
                <p style="margin-bottom: 25px; font-size: 40px;">
                    <strong>SKU:</strong> ${singleProduct?.sku || "N/A"}
                </p>
                <p style="margin-bottom: 20px; font-size: 40px;">
                    <strong>Description:</strong> ${
                        singleProduct?.des?.description || "No description available."
                    }
                </p>
            `;
            content.innerHTML += details;

            // Specifications
            Object.keys(singleProduct.des || {}).forEach((key) => {
                if (key !== "description") {
                    content.innerHTML += `
                        <p style="margin-bottom: 25px; font-size: 40px;">
                            <strong>${capitalizeFirstLetter(key)}:</strong> ${
                        singleProduct.des[key]
                    }
                        </p>`;
                }
            });

            // ** Append content temporarily to DOM **
            document.body.appendChild(content); // Attach the content to DOM temporarily

            // Render content to canvas
            const canvas = await html2canvas(content, { scale: 2, useCORS: true });

            // Remove content from DOM after rendering
            document.body.removeChild(content);

            const imgData = canvas.toDataURL("image/png");
            const imgWidth = pageWidth - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add image to PDF
            doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

            // Save the PDF
            doc.save(
                `${singleProduct?.productname || "Product"}-specifications.pdf`
            );
        };

    

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
                onClick={downloadPDF}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginTop: "20px",
                }}
            >
                Download Specifications
            </button>
        </div>
    );
};

export default ProductSpecificationDownload;


