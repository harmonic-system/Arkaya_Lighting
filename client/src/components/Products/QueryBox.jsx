import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { Button } from '../../styles/Button';
import { useAuthContext } from '../../context/auth-context';
import { useContactContext } from '../../context/contact-context';

const QueryBox = ({ productId, productName, sku }) => {

    const { user } = useAuthContext()
    const { handleQuerySubmit } = useContactContext()

    const [queryData, setQueryData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        query: ""
    })

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productCode, setProductCode] = useState(null);
    const [productname, setProductname] = useState(null);
    const [productSku, setProductSku] = useState("");

    const openModal = (Id, name, sku) => {
        setProductCode(Id);
        setProductname(name);
        setProductSku(sku);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setProductCode(null);
        setProductname(null);
        setProductSku(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (user) {
            setQueryData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                organization: user.organization,
                query: ""
            })
        }
    }, [user])

    const handleChange = (e) => {
        setQueryData({
            ...queryData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const completeQueryData = {
            ...queryData,
            productCode,
            productName: productname,
            productSku
        };
        try {
            handleQuerySubmit(completeQueryData)
            closeModal()
            setQueryData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                organization: user.organization,
                query: ""
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <QueryBoxWrapper>
                <button
                    type="button"
                    onClick={() => openModal(productId, productName, sku)}
                >
                    Send Enquiry
                </button>
                {isModalOpen && (
                    <div className={`modal ${isModalOpen ? 'show' : ''}`}>

                        <div className="modal-content">
                            <div className="model-header">
                                <h2>Send Enquiry</h2>
                                <button className="modal-close" onClick={closeModal}>
                                    <IoClose />
                                </button>
                            </div>
                            <form className="contact-inputs" onSubmit={handleSubmit}>
                                <input
                                    value={productCode}
                                    placeholder="Product Code"
                                    type="text"
                                    name="productCode"
                                    required
                                    hidden
                                    readOnly
                                />
                                <input
                                    value={productname}
                                    placeholder="Product Name"
                                    type="text"
                                    name="productName"
                                    required
                                    readOnly
                                />
                                <input
                                    value={productSku}
                                    placeholder="Product SKU Number"
                                    type="text"
                                    name="productSKU"
                                    hidden
                                    readOnly
                                />
                                <input
                                    onChange={handleChange}
                                    value={queryData.name}
                                    placeholder="Your Name"
                                    type="text"
                                    name="name"
                                    required
                                />
                                <input
                                    onChange={handleChange}
                                    value={queryData.email}
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    required
                                />
                                <input
                                    onChange={handleChange}
                                    value={queryData.phone}
                                    placeholder="Phone"
                                    type="number"
                                    name="phone"
                                    required
                                />
                                <input
                                    onChange={handleChange}
                                    value={queryData.organization}
                                    placeholder="Organization Name (optional)"
                                    type="text"
                                    name="organization"
                                />
                                <textarea
                                    onChange={handleChange}
                                    value={queryData.query}
                                    placeholder="Please write your enquiry or message regarding the product."
                                    name="query"
                                    required
                                ></textarea>
                                <Button type="submit">Submit</Button>
                            </form>
                        </div>
                    </div>

                )}
            </QueryBoxWrapper>
        </>
    )
}

export default QueryBox

const QueryBoxWrapper = styled.section`
/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Show Modal */
.modal.show {
    display: flex;
}

/* Modal Content */
.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 90%;
    max-width: 700px;
    animation: fadeIn 0.3s ease-in-out;
}

/* Header */
.model-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid #ddd;

    h2 {
        font-size: 2rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary};
    }

    .modal-close {
        background: #ccc;
        color: #333;
        padding: 0.75rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
            background: #bbb;
        }
    }
}

/* Form Styles */
.contact-inputs {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    input,
    textarea {
        border-radius: 1rem;
        font-size: 1.4rem;
        transition: border-color 0.3s ease;

        &:focus {
            border-color: ${({ theme }) => theme.colors.primary};
        }
    }

    textarea {
        resize: none;
        height: 120px;
    }

    ::placeholder {
        font-size: 1.3rem;
        color: #aaa;
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .modal-content {
        width: 90%;
        padding: 1.5rem;
    }

    h2 {
        font-size: 1.8rem;
    }

    input,
    textarea {
        font-size: 1.2rem;
    }

    Button {
        font-size: 1.4rem;
    }
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

/* Keyframe Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
