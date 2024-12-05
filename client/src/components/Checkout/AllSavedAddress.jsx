import React, { useEffect, useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import styled from 'styled-components';
import { Button } from '../../styles/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EditSavedAddress from './EditSavedAddress';
import { useAuthContext } from '../../context/auth-context';

const AllSavedAddress = () => {

    const { token, address, getAddress, deleteAddress, selectedAddress, setSelectedAddress } = useAuthContext()


    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const navigate = useNavigate()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openDeleteModal = (addressId) => {
        setSelectedAddressId(addressId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedAddressId(null);
        setIsDeleteModalOpen(false);
    };

    const openEditModal = (addressId) => {
        setSelectedAddressId(addressId);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedAddressId(null);
        setIsEditModalOpen(false);
    };

    useEffect(() => {
        if (token) {
            getAddress()
        }
    }, [token])

    // Handle address selection change
    const handleAddressChange = (e) => {
        const selectedId = e.target.value;
        const select = address?.find((address) => address?._id === selectedId);
        setSelectedAddress(select);
    };

    // console.log(selectedAddress);

    const handleContinueToPayment = () => {
        if (!selectedAddress) {
            return toast.error("Please select address")
        }
        navigate("/user/proceedtopayment")
    }

    return (
        <SavedAddressWrapper>
            <div className="allAddress-container">
                <h4><strong>Saved Addresses</strong></h4>
                {address?.length > 0 ? (
                    <div className="address-list">
                        {address?.map((address) => (
                            <div key={address?._id} className="address-item">
                                <label className="address-radio">
                                    <input
                                        type="radio"
                                        name="address"
                                        value={address?._id}
                                        checked={selectedAddress?._id === address?._id}
                                        onChange={handleAddressChange}
                                    />
                                    <div className="address-info">
                                        <strong>{address?.name}</strong>
                                        <p>{address?.phone}</p>
                                        <p>{address?.street}, {address?.city}, {address?.state}, {address?.zip}</p>
                                        <div className="button-group">
                                            <button className='addr-edit' onClick={() => openEditModal(address?._id)}><BiSolidEdit /></button>
                                            {isEditModalOpen && (
                                                <EditSavedAddress addressId={selectedAddressId} closeModal={closeEditModal} />
                                            )}
                                            <button className='addr-delete' onClick={() => openDeleteModal(address?._id)}><MdDelete /></button>
                                        </div>
                                        {isDeleteModalOpen && (
                                            <div className={`modal ${isDeleteModalOpen ? 'show' : ''}`}>
                                                <div className="modal-content">
                                                    <h2>Confirm Deletion</h2>
                                                    <p>Are you sure you want to delete this product?</p>
                                                    <div className="modal-actions">
                                                        <Button className="modal-close" onClick={closeDeleteModal}>
                                                            Close
                                                        </Button>
                                                        <Button
                                                            className="modal-delete"
                                                            onClick={() => {
                                                                deleteAddress(selectedAddressId);
                                                                closeDeleteModal();
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No saved addresses available.</p>
                )}
            </div>
            <Button onClick={handleContinueToPayment}>Continue To Payment</Button>
        </SavedAddressWrapper>
    );
};

export default AllSavedAddress;


const SavedAddressWrapper = styled.section`
.allAddress-container {
    width: 100%;
    // max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    // background-color: #f9f9f9;
    border-radius: 8px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2, h4 {
    margin-bottom: 20px;
}

.address-list {
    display: flex;
    flex-direction: column;
}

.address-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.address-radio {
    display: flex;
    width:100%;
}

.address-radio input[type="radio"] {
    margin-right: 10px;
    box-shadow:none;
}

.address-info {
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
}

.address-info strong {
    display: block;
    font-size: 12px;
    font-weight: bold;
    color: #333;
}

.address-info p {
    margin-top: 5px;
    color: #666;
    font-size: 12px;
}

.address-info .button-group {
    margin-top: 5px;
    display: flex;
    justify-content: start;
    gap: 2rem;
    align-items: center;
    color: #666;
    font-size: 12px;
}

.address-info .button-group button {
    padding: 1px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
}

.address-info .button-group button.addr-edit {
    background-color: #007bff;

    &:hover {
        background-color: #0069d9;
    }
}

.address-info .button-group button.addr-delete {
    background-color: #e74c3c;

    &:hover {
        background-color: #c0392b;
    }
}

.address-info .button-group button svg {
    font-size: 12px;
}

// button[type="submit"] {
//     width: 100%;
//     padding: 12px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     font-size: 16px;
//     cursor: pointer;
//     transition: background-color 0.3s;
// }

// button[type="submit"]:hover {
//     background-color: #0056b3;
// }

/* Modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1) !important;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.modal.show {
  display: flex;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.modal h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.modal p {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
}

.modal-close,
.modal-delete {
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.modal-close {
  background: #ccc;
  color: #333;
}

.modal-delete {
  background: #ffc221;
  color: #fff;
}

.modal-close:hover {
  background: #bbb;
}

.modal-delete:hover {
  background: #ffdd73;
}

`

