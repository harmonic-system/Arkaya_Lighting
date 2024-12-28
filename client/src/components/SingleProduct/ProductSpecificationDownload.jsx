// Old Function Without htmlCanvas
// import React from "react";
// import { jsPDF } from "jspdf";

// const ProductSpecificationDownload = ({ singleProduct }) => {
//     // Capitalize the first letter of a string
//     const capitalizeFirstLetter = (text) => {
//         return text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A";
//     };


//     const padding = 10; // Vertical padding for content spacing
//     const borderPadding = 15; // Increased padding for better spacing from the border
//     const contentPaddingX = borderPadding + 10; // Adjusted horizontal padding inside the border

//     const downloadPDF = () => {
//         // Initialize PDF
//         const doc = new jsPDF();
//         const pageWidth = doc.internal.pageSize.width;
//         const pageHeight = doc.internal.pageSize.height;

//         let yStart = borderPadding + padding; // Start position for content

//         // Function to draw border
//         const drawBorder = () => {
//             doc.setDrawColor(200, 200, 200); // Light gray border
//             doc.setLineWidth(0.5);
//             doc.rect(
//                 borderPadding,
//                 borderPadding,
//                 pageWidth - 2 * borderPadding,
//                 pageHeight - 2 * borderPadding
//             );
//         };

//         // Function to add logo
//         const addLogo = () => {
//             const logoUrl = "../../../images/arkaya-logo-transformed.png";
//             doc.addImage(logoUrl, "PNG", borderPadding, borderPadding, 50, 20);
//             yStart = borderPadding + padding + 30; // Adjust yStart after logo
//         };

//         // Handle page overflow
//         const handlePageOverflow = (requiredHeight) => {
//             if (yStart + requiredHeight > pageHeight - borderPadding) {
//                 doc.addPage(); // Add a new page
//                 drawBorder(); // Redraw border
//                 addLogo(); // Add logo at the top of the new page
//                 yStart = borderPadding + padding + 30; // Reset yStart for new page
//             }
//         };

//         // Draw border and logo
//         drawBorder();
//         addLogo();
        
//         // Add Product Image and Details Side-by-Side
//         const imageWidth = 80; // Width for product image
//         const imageStartX = contentPaddingX; // Start X position for image
//         const textStartX = imageStartX + imageWidth + 15; // Start X for text beside image
//         const textWidth = pageWidth - textStartX - borderPadding; // Available width for text

//         let imageHeight = 80; // Default image height
//         if (singleProduct?.productfile?.url) {
//             // Add Product Image with proper padding
//             doc.addImage(
//                 singleProduct.productfile.url,
//                 "JPEG",
//                 imageStartX, // Updated to use content padding
//                 yStart,
//                 imageWidth,
//                 imageHeight
//             );
//         }

//         // Add Product Details beside Image
//         let textY = yStart + 10; // Start Y position for text beside image

//         // Product Name - Handles Line Breaks
//         if (singleProduct?.productname) {
//             doc.setFontSize(12);
//             doc.setFont("helvetica", "bold");
//             doc.text(`Product:`, textStartX, textY); // Label

//             doc.setFont("helvetica", "normal");

//             // Wrap Product Name Text
//             const productNameLines = doc.splitTextToSize(
//                 singleProduct.productname,
//                 textWidth // Available width inside border
//             );

//             // Add each line dynamically
//             productNameLines.forEach((line) => {
//                 textY += 8; // Move down for each line
//                 doc.text(line, textStartX, textY); // Render line
//             });
//             textY += 8; // Add padding after product name
//         }

//         // Model
//         if (singleProduct?.model) {
//             doc.setFontSize(12);
//             doc.setFont("helvetica", "bold");
//             doc.text(`Model:`, textStartX, textY);
//             doc.setFont("helvetica", "normal");
//             doc.text(singleProduct.model, textStartX + 35, textY);
//             textY += 10;
//         }

//         // SKU
//         if (singleProduct?.sku) {
//             doc.setFontSize(12);
//             doc.setFont("helvetica", "bold");
//             doc.text(`SKU:`, textStartX, textY);
//             doc.setFont("helvetica", "normal");
//             doc.text(singleProduct.sku, textStartX + 35, textY);
//             textY += 20; // Padding after details
//         }

//         // Adjust yStart based on the tallest content
//         yStart += Math.max(imageHeight, textY - yStart);

//         // Precaution Section
//         doc.setFontSize(10);
//         doc.setFont("helvetica", "bold");
//         doc.text("PRECAUTION:", contentPaddingX, yStart);
//         doc.setFont("helvetica", "normal");
//         doc.text(
//             "Please read all specifications of the product carefully before installation.",
//             contentPaddingX + 30,
//             yStart
//         );
//         yStart += 20;

//         // Product Description - Always First
//         if (singleProduct?.des?.description) {
//             doc.setFontSize(12);
//             doc.setFont("helvetica", "bold");
//             doc.text("Description:", contentPaddingX, yStart);
//             yStart += 10;

//             const splitDescription = doc.splitTextToSize(
//                 singleProduct.des.description,
//                 pageWidth - 2 * contentPaddingX // Adjusted width for inner padding
//             );
//             handlePageOverflow(splitDescription.length * 10); // Check for overflow
//             doc.setFont("helvetica", "normal");
//             doc.text(splitDescription, contentPaddingX, yStart);
//             yStart += splitDescription.length * 10 + 10; // Add padding
//         }

//         // Loop through remaining keys in singleProduct.des (excluding description)
//         const productSpec = Object.keys(singleProduct.des).filter(
//             (key) => key !== "description" // Exclude 'description'
//         );

//         // Check if there are valid specifications
//         if (productSpec.length > 0) {
//             doc.setFontSize(12);
//             doc.setFont("helvetica", "bold");
//             doc.text("Product Features", contentPaddingX, yStart);
//             yStart += 10;

//             productSpec.forEach((key) => {
//                 const value = singleProduct.des[key];

//                 // Check if value is NOT empty, null, or undefined
//                 if (value !== null && value !== undefined && value !== "") {
//                     // Split text if it overflows
//                     const splitText = doc.splitTextToSize(
//                         `${capitalizeFirstLetter(key)}: ${value}`,
//                         pageWidth - 2 * contentPaddingX // Adjusted width
//                     );

//                     // Handle page overflow dynamically
//                     handlePageOverflow(splitText.length * 10);

//                     // Set normal font and add the text
//                     doc.setFont("helvetica", "normal");
//                     doc.text(splitText, contentPaddingX, yStart);
//                     yStart += splitText.length * 10 + 5; // Add padding after each entry
//                 }
//             });
//         }


//         // Save the PDF
//         doc.save(
//             `${singleProduct?.productname || "Product"}-specifications.pdf`
//         );
//     };

//     return (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <button
//                 onClick={downloadPDF}
//                 style={{
//                     padding: "10px 20px",
//                     backgroundColor: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     fontSize: "16px",
//                 }}
//             >
//                 Download Specifications
//             </button>
//         </div>
//     );
// };

// export default ProductSpecificationDownload;



// New Function with Html Canvas

import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ProductSpecificationDownload = ({ singleProduct }) => {
    const capitalizeFirstLetter = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A";
    };

    // With second page but still not stable some issues are there 

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



    // For single Page currently we are using this only for one page
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







