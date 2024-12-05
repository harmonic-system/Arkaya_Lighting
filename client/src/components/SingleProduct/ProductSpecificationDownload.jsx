import React from 'react';
import { jsPDF } from 'jspdf';
// import companyLogo from "../../../public/images/arkaya-logo-transformed.png"

// doc.addImage("../../../public/images/arkaya-logo-transformed.png", 'PNG', 150, 10, 50, 20); // x, y, width, height

const ProductSpecificationDownload = ({ singleProduct }) => {

    const capitalizeFirstLetter = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A";
    };

    const padding = 10; // Define padding value

    const downloadPDF = () => {
        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Draw the border around the full page with a 10px margin inside
        const borderPadding = 10; // Margin inside the border

        // doc.setDrawColor(0); // Black border
        // doc.setLineWidth(0.5);
        // doc.rect(borderPadding, borderPadding, pageWidth - 2 * borderPadding, pageHeight - 2 * borderPadding);

        doc.setDrawColor(255, 255, 224); // Light yellow border
        doc.setLineWidth(0.5);
        doc.rect(
            borderPadding,
            borderPadding,
            pageWidth - 2 * borderPadding,
            pageHeight - 2 * borderPadding
        );

        // Set up a consistent starting point with padding
        let xStart = borderPadding + padding;
        let yStart = borderPadding + padding + 20; // Add extra space for the title/logo

        // Add company logo
        doc.addImage("../../../images/arkaya-logo-transformed.png", 'PNG', pageWidth - borderPadding - 60, borderPadding + 10, 50, 20); // Positioned at the top-right corner

        // Add title with consistent padding
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text("Product Specifications", xStart, yStart);
        yStart += 2; // Move down for the next section

        // Product image
        if (singleProduct?.productfile?.url) {
            doc.addImage(singleProduct.productfile.url, 'JPEG', xStart, yStart, 50, 50);
            yStart += 60; // Move down after the image
        }

        // Product Name
        const productName = singleProduct?.productname || "N/A";
        const splitProductName = doc.splitTextToSize(productName, pageWidth - 2 * (borderPadding + padding) - 50); // Account for padding
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Product Name:`, xStart, yStart);
        doc.text(splitProductName, xStart + 50, yStart);
        yStart += splitProductName.length * 2 + padding; // Adjust for text height and padding

        // Category
        const category = capitalizeFirstLetter(singleProduct?.productCategory);
        doc.text(`Category:`, xStart, yStart);
        doc.text(category, xStart + 50, yStart);
        yStart += padding;

        // Model
        if (singleProduct?.model) {
            doc.text(`Model:`, xStart, yStart);
            doc.text(singleProduct?.model || "N/A", xStart + 50, yStart);
            yStart += padding;
        }

        // SKU
        if (singleProduct?.sku) {
            doc.text(`SKU:`, xStart, yStart);
            doc.text(singleProduct.sku, xStart + 50, yStart);
            yStart += padding;
        }

        // Specifications
        if (singleProduct?.des) {
            doc.text(`Specifications:`, xStart, yStart);
            yStart += 10;
            Object.keys(singleProduct.des).forEach((key) => {
                const value = singleProduct.des[key];
                if (value) {
                    const splitText = doc.splitTextToSize(`${key}: ${value}`, pageWidth - 2 * (borderPadding + padding));
                    doc.text(splitText, xStart, yStart);
                    yStart += splitText.length * 2 + padding;
                }
            });
        }
        // Save the PDF
        doc.save(`${singleProduct?.productname || "Product"}-specifications.pdf`);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
                onClick={downloadPDF}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                Download Specifications
            </button>
        </div>
    )
}

export default ProductSpecificationDownload;












// import React from 'react';
// import { jsPDF } from 'jspdf';

// const ProductSpecificationDownload = ({ singleProduct }) => {
//     const downloadPDF = () => {
//         const doc = new jsPDF();

//         // Add product image (using URL or base64)
//         if (singleProduct?.productfile?.url) {
//             doc.addImage(singleProduct.productfile.url, 'JPEG', 10, 10, 50, 50); // x, y, width, height
//         }

//         // Add product specifications
//         doc.setFontSize(16);
//         doc.text("Product Specifications", 10, 70); // Adjust position based on image height

//         doc.setFontSize(12);
//         doc.text(`Product Name: ${singleProduct?.productname || "N/A"}`, 10, 80);
//         doc.text(`Category: ${singleProduct?.productCategory || "N/A"}`, 10, 90);
//         doc.text(`Model: ${singleProduct?.model || "N/A"}`, 10, 100);

//         // Conditionally show SKU
//         if (singleProduct?.sku) {
//             doc.text(`SKU: ${singleProduct.sku}`, 10, 110);
//         }

//         // Dynamically add description details with line breaks for overflowing text
//         if (singleProduct?.des) {
//             let yPosition = singleProduct?.sku ? 120 : 110; // Adjust based on SKU presence
//             Object.keys(singleProduct.des).forEach((key) => {
//                 const value = singleProduct.des[key];
//                 if (value) {
//                     const splitText = doc.splitTextToSize(`${key}: ${value}`, 180); // Split text into lines to fit width
//                     doc.text(splitText, 10, yPosition);
//                     yPosition += splitText.length * 10; // Adjust y-position based on the number of lines
//                 }
//             });
//         }

//         // Trigger the download
//         doc.save(`${singleProduct?.productname || "Product"}-specifications.pdf`);
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <button
//                 onClick={downloadPDF}
//                 style={{
//                     padding: '10px 20px',
//                     backgroundColor: '#007bff',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                     fontSize: '16px',
//                 }}
//             >
//                 Download Specifications
//             </button>
//         </div>
//     );
// };

// export default ProductSpecificationDownload;
