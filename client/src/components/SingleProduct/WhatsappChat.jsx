import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappChat = ({ name, img, sku, model }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productname, setProductName] = useState(null);
    const [productImg, setProductImg] = useState(null);
    const [productSku, setProductSku] = useState(null);
    const [productModel, setProductModel] = useState(null);

    const openModal = (name, img, sku) => {
        setProductName(name);
        setProductImg(img);
        setProductSku(sku);
        setProductModel(model)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };

    // Close modal when ESC key is pressed
    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    const baseUrl = `https://wa.me/919873241041?text=`;
    const encodedMessage = baseUrl + encodeURIComponent(
        `Hello, I would like to discuss this product:\nProduct Name: ${productname}\nModel: ${productModel}\nSKU: ${productSku}\nCould you please assist me?`
    );

    return (
        <>
            <WhatsappChatWrapper>

                <div className="whatsapp-btn">
                    <img
                        src="../../../../images/whatsapp-button.png"
                        alt="Chat on WhatsApp"
                        className=""
                        onClick={() => openModal(name, img, sku)}
                    />
                </div>


                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>
                                    <a
                                        href={encodedMessage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaWhatsapp size={24} style={{ color: "#00a884" }} />
                                        Click here to Chat on WhatsApp
                                    </a>
                                </h2>
                                <button className="modal-close" onClick={closeModal}>
                                    <IoClose size={15} />
                                </button>
                            </div>
                            <div className="modal-body">
                                {productImg && (
                                    <img src={productImg} alt={productname} className="product-img" />
                                )}
                                <p><strong>Product Name:</strong> {productname}</p>
                                <p><strong>Model:</strong> {productModel}</p>
                                <p><strong>SKU:</strong> {productSku}</p>
                            </div>
                        </div>
                    </div>
                )}
            </WhatsappChatWrapper>
        </>
    );
};

export default WhatsappChat;

const WhatsappChatWrapper = styled.section`
/* WhatsApp Button */
.whatsapp-btn {
    width: 200px;
    cursor: pointer;
    z-index: 999;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 50%;
}

.whatsapp-btn:hover {
    transform: scale(1.1);
}

.whatsapp-btn img {
    width: 100%;
}

/* Modal Overlay */
.modal-overlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Modal Content */
.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    animation: fadeIn 0.3s ease;
}

/* Modal Header */
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.modal-header h2 a {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    gap: 0.5rem;
    text-decoration: none;
    color: #00a884;
}

/* Modal Close Button */
.modal-close {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem !important;
    font-size: 1rem;
    color: #555;
    transition: color 0.3s ease;
}

.modal-close:hover {
    color: #333;
}

/* Modal Body */
.modal-body {
    text-align: center;
}

.product-img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 8px;
    margin-bottom: 1rem;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .modal-content {
        padding: 1.5rem;
    }

    .modal-header h2 a {
        font-size: 1rem;
    }
}
`;


