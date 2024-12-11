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
                <Button
                    type="button"
                    className="delete-btn"
                    onClick={() => openModal(productId, productName, sku)}
                >
                    Send Enquiry
                </Button>
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
    width: 100%;
    height: 100%;
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
    margin-bottom:2rem;
    border-bottom: 1px solid #ddd;
}

.modal h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
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

.contact-inputs {
    display: flex;
    flex-direction: column;
    gap: 3rem;

        input {
            border-radius: 1rem
        }

        textarea {
            border-radius: 1rem;
            resize: none;
        }

        Button {
            width: 100%;
            cursor: pointer;
            transition: all 0.2s;

        &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
        }
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




`