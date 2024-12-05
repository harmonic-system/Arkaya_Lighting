import React from "react";
import { jsPDF } from "jspdf";

const ProductSpecificationDownload = ({ singleProduct }) => {
    const capitalizeFirstLetter = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A";
    };

    const padding = 10; // Define padding value

    const addNewPage = (doc, pageWidth, pageHeight, borderPadding) => {
        doc.addPage();
        doc.setDrawColor(255, 255, 224); // Light yellow border
        doc.setLineWidth(0.5);
        doc.rect(
            borderPadding,
            borderPadding,
            pageWidth - 2 * borderPadding,
            pageHeight - 2 * borderPadding
        );
        doc.addImage("../../../images/arkaya-logo-transformed.png", 'PNG', pageWidth - borderPadding - 60, borderPadding + 10, 50, 20);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Draw the border around the full page with a 10px margin inside
        const borderPadding = 10;
        doc.setDrawColor(255, 255, 224); // Light yellow border
        doc.setLineWidth(0.5);
        doc.rect(
            borderPadding,
            borderPadding,
            pageWidth - 2 * borderPadding,
            pageHeight - 2 * borderPadding
        );

        let xStart = borderPadding + padding;
        let yStart = borderPadding + padding + 20; // Add extra space for title/logo

        // Add company logo
        doc.addImage("../../../images/arkaya-logo-transformed.png", 'PNG', pageWidth - borderPadding - 60, borderPadding + 10, 50, 20);

        // Add title
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Product Specifications", xStart, yStart);
        yStart += 20;

        // Product image
        if (singleProduct?.productfile?.url) {
            doc.addImage(singleProduct.productfile.url, "JPEG", xStart, yStart, 50, 50);
            yStart += 60;
        }

        // Helper function to check and handle page overflow
        const handlePageOverflow = (requiredHeight) => {
            if (yStart + requiredHeight > pageHeight - borderPadding) {
                addNewPage(doc, pageWidth, pageHeight, borderPadding);
                yStart = borderPadding + padding + 20; // Reset yStart for new page
            }
        };

        // Product Name
        const productName = singleProduct?.productname || "N/A";
        const splitProductName = doc.splitTextToSize(productName, pageWidth - 2 * (borderPadding + padding) - 50);
        handlePageOverflow(splitProductName.length * 10); // Check for overflow
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Product Name:`, xStart, yStart);
        doc.text(splitProductName, xStart + 50, yStart);
        yStart += splitProductName.length * 10 + padding;

        // Category
        const category = capitalizeFirstLetter(singleProduct?.productCategory);
        handlePageOverflow(10); // Check for overflow
        doc.text(`Category:`, xStart, yStart);
        doc.text(category, xStart + 50, yStart);
        yStart += 10 + padding;

        // Model
        if (singleProduct?.model) {
            handlePageOverflow(10); // Check for overflow
            doc.text(`Model:`, xStart, yStart);
            doc.text(singleProduct?.model, xStart + 50, yStart);
            yStart += 10 + padding;
        }

        // SKU
        if (singleProduct?.sku) {
            handlePageOverflow(10); // Check for overflow
            doc.text(`SKU:`, xStart, yStart);
            doc.text(singleProduct.sku, xStart + 50, yStart);
            yStart += 10 + padding;
        }

        // Specifications
        if (singleProduct?.des) {
            doc.text(`Specifications:`, xStart, yStart);
            yStart += 10;

            Object.keys(singleProduct.des).forEach((key) => {
                const value = singleProduct.des[key];
                if (value) {
                    const splitText = doc.splitTextToSize(`${key}: ${value}`, pageWidth - 2 * (borderPadding + padding));
                    handlePageOverflow(splitText.length * 10); // Check for overflow
                    doc.text(splitText, xStart, yStart);
                    yStart += splitText.length * 10 + padding;
                }
            });
        }

        // Save the PDF
        doc.save(`${singleProduct?.productname || "Product"}-specifications.pdf`);
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
                }}
            >
                Download Specifications
            </button>
        </div>
    );
};

export default ProductSpecificationDownload;




// import React from "react";
// import { jsPDF } from "jspdf";

// const ProductSpecificationDownload = ({ singleProduct }) => {
//     const capitalizeFirstLetter = (text) => {
//         return text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A";
//     };

//     const padding = 10; // Define padding value

//     const addNewPage = (doc, pageWidth, pageHeight, borderPadding) => {
//         doc.addPage();
//         doc.setDrawColor(255, 255, 224); // Light yellow border
//         doc.setLineWidth(0.5);
//         doc.rect(
//             borderPadding,
//             borderPadding,
//             pageWidth - 2 * borderPadding,
//             pageHeight - 2 * borderPadding
//         );
//         doc.addImage("../../../images/arkaya-logo-transformed.png", 'PNG', pageWidth - borderPadding - 60, borderPadding + 10, 50, 20);
//     };

//     const handlePageOverflow = (requiredHeight, doc, pageHeight, yStart, pageWidth, borderPadding) => {
//         if (yStart + requiredHeight > pageHeight - borderPadding) {
//             addNewPage(doc, pageWidth, pageHeight, borderPadding);
//             yStart = borderPadding + padding + 20; // Reset yStart for new page
//         }
//         return yStart;
//     };

//     const handleTextOverflowWidth = (text, doc, pageWidth, xStart, yStart) => {
//         const splitText = doc.splitTextToSize(text, pageWidth - 2 * (xStart)); // Ensure text fits within the page width
//         splitText.forEach((line) => {
//             doc.text(line, xStart, yStart);
//             yStart += 10; // Move down for each line
//         });
//         return yStart;
//     };

//     const downloadPDF = () => {
//         const doc = new jsPDF();
//         const pageWidth = doc.internal.pageSize.width;
//         const pageHeight = doc.internal.pageSize.height;

//         // Draw the border around the full page with a 10px margin inside
//         const borderPadding = 10;
//         doc.setDrawColor(255, 255, 224); // Light yellow border
//         doc.setLineWidth(0.5);
//         doc.rect(
//             borderPadding,
//             borderPadding,
//             pageWidth - 2 * borderPadding,
//             pageHeight - 2 * borderPadding
//         );

//         let xStart = borderPadding + padding;
//         let yStart = borderPadding + padding + 20; // Add extra space for title/logo

//         // Add company logo
//         doc.addImage("../../../images/arkaya-logo-transformed.png", 'PNG', pageWidth - borderPadding - 60, borderPadding + 10, 50, 20);

//         // Add title with decreased font size and weight
//         doc.setFontSize(16); // Reduced font size
//         doc.setFont("helvetica", "normal"); // Normal font weight
//         doc.text("Product Specifications", xStart, yStart);
//         yStart += 20;

//         // Product image
//         if (singleProduct?.productfile?.url) {
//             doc.addImage(singleProduct.productfile.url, "JPEG", xStart, yStart, 50, 50);
//             yStart += 60;
//         }

//         // Product Name with decreased font size
//         const productName = singleProduct?.productname || "N/A";
//         yStart = handlePageOverflow(20, doc, pageHeight, yStart, pageWidth, borderPadding); // Handle overflow for page height
//         yStart = handleTextOverflowWidth(productName, doc, pageWidth, xStart + 50, yStart);

//         // Category with decreased font size
//         const category = capitalizeFirstLetter(singleProduct?.productCategory);
//         yStart = handlePageOverflow(10, doc, pageHeight, yStart, pageWidth, borderPadding); // Handle overflow for page height
//         doc.text(`Category:`, xStart, yStart);
//         doc.text(category, xStart + 50, yStart);
//         yStart += 10 + padding;

//         // Model with decreased font size
//         if (singleProduct?.model) {
//             yStart = handlePageOverflow(10, doc, pageHeight, yStart, pageWidth, borderPadding); // Handle overflow for page height
//             doc.text(`Model:`, xStart, yStart);
//             doc.text(singleProduct?.model, xStart + 50, yStart);
//             yStart += 10 + padding;
//         }

//         // SKU with decreased font size
//         if (singleProduct?.sku) {
//             yStart = handlePageOverflow(10, doc, pageHeight, yStart, pageWidth, borderPadding); // Handle overflow for page height
//             doc.text(`SKU:`, xStart, yStart);
//             doc.text(singleProduct.sku, xStart + 50, yStart);
//             yStart += 10 + padding;
//         }

//         // Specifications with decreased font size
//         if (singleProduct?.des) {
//             doc.text(`Specifications:`, xStart, yStart);
//             yStart += 10;

//             Object.keys(singleProduct.des).forEach((key) => {
//                 const value = singleProduct.des[key];
//                 if (value) {
//                     yStart = handlePageOverflow(10, doc, pageHeight, yStart, pageWidth, borderPadding); // Handle overflow for page height
//                     yStart = handleTextOverflowWidth(`${key}: ${value}`, doc, pageWidth, xStart, yStart); // Handle text overflow for width
//                 }
//             });
//         }

//         // Save the PDF
//         doc.save(`${singleProduct?.productname || "Product"}-specifications.pdf`);
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


