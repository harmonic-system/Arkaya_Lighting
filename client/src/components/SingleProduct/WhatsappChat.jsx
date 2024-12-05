import { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '../../styles/Button';

const WhatsappChat = ({ name, img, sku }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productname, setProductName] = useState(null);
    const [productImg, setProductImg] = useState(null);
    const [productSku, setProductSku] = useState(null);

    const openModal = (name, img, sku) => {
        setProductName(name);
        setProductImg(img);
        setProductSku(sku);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setProductName(null);
        setProductImg(null);
        setProductSku(null);
        setIsModalOpen(false);
    };

    // const baseUrl = `https://wa.me/919873241041?text=`;
    // const encodedMessage = baseUrl + encodeURIComponent(
    //     `Hello, I would like to discuss this product:\nProduct Name: ${productname}\nSKU: ${productSku}\nCould you please assist me?`
    // );

    const baseUrl = `https://wa.me/919873241041?text=`;
    const encodedMessage = baseUrl + encodeURIComponent(
        `Hello, I would like to discuss this product:\nProduct Name: ${productname}\nSKU: ${productSku}\nCould you please assist me?`
    );

    return (
        <>
            <WhatsappChatWrapper>
                <Button onClick={() => openModal(name, img, sku)} >
                    Chat With Us On Whatsapp
                </Button>
                {isModalOpen && (
                    <div className={`modal ${isModalOpen ? 'show' : ''}`}>

                        <div className="modal-content">
                            <div className="model-header">
                                {/* <h2><a href={`https://wa.me/919873241041?text=${encodedMessage}`} target="_blank" rel="noopener noreferrer" ><FaWhatsapp size={24} style={{ color: "#00a884" }} />Click Here To Chat On Whatsapp</a></h2> */}
                                <h2><a href={encodedMessage} target="_blank" rel="noopener noreferrer" ><FaWhatsapp size={24} style={{ color: "#00a884" }} />Click Here To Chat On Whatsapp</a></h2>
                                <Button className="modal-close" onClick={closeModal}>
                                    <IoClose />
                                </Button>
                            </div>
                        </div>
                    </div>

                )}
            </WhatsappChatWrapper>
        </>
    )
}

export default WhatsappChat

const WhatsappChatWrapper = styled.section`

.delete-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #ffc221;
}

.delete-btn:hover {
  color: #ffdd73;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Display modal when 'show' class is added */
.modal.show {
    display: flex;
}

.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
}

.model-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal .model-header h2 a {
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    justify-content:center;
    align-items: center;
    gap:1rem;
}

.modal-close {
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    border: none;
}

.modal-close {
    background: #ccc;
    color: #333;
    display:flex;
    justify-content: center;
    align-items: center;
}

.modal-close:hover {
    background: #bbb;
}

@media (min-width: 425px) {
  .modal-content {
    width: 300px;
  }
}

@media (min-width: 768px) {
  .modal-content {
    width: 600px;
  }
}

@media (min-width: 1440px) {
  .modal-content {
    width: 700px;
  }
}

@media (min-width: 2600px) {
  .modal-content {
    width: 700px;
  }
}

`

