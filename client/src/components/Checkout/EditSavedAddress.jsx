import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { useAuthContext } from '../../context/auth-context';
import { Button } from '../../styles/Button';
import LoadingPage from '../Loading/Loading';
import ActionLoading from '../Loading/ActionLoading';

const EditSavedAddress = ({ addressId, closeModal }) => {

    const { getSingleAddress, singleAddress, addressLoading, updateAddress } = useAuthContext();
    const [formErrors, setFormErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        street: '',
        city: '',
        country: '',
        state: '',
        zip: '',
    });

    useEffect(() => {
        if (addressId) {
            getSingleAddress(addressId);
        }
    }, []);

    useEffect(() => {
        if (singleAddress && singleAddress._id === addressId) {
            setFormData({
                name: singleAddress?.name,
                email: singleAddress?.email,
                phone: singleAddress?.phone,
                address: singleAddress?.address,
                street: singleAddress?.street,
                city: singleAddress?.city,
                country: singleAddress?.country,
                state: singleAddress?.state,
                zip: singleAddress?.zip,
            });
        }
    }, [singleAddress, addressId]);

    // Text input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Phone number validation logic for 10 digits
        if (name === 'phone') {
            if (/^\d{0,10}$/.test(value)) {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        }
        if (name === 'zip') {
            if (/^\d{0,6}$/.test(value)) {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.phone) errors.phone = 'Phone is required';
        else if (formData.phone.length !== 10) errors.phone = 'Phone number must be exactly 10 digits';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.street) errors.street = 'Street is required';
        if (!formData.city) errors.city = 'City is required';
        if (!formData.country) errors.country = 'Country is required';
        if (!formData.state) errors.state = 'State is required';
        if (!formData.zip) errors.zip = 'Zip code is required';
        else if (formData.zip.length !== 6) errors.zip = 'Zip number must be exactly 6 digits';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            updateAddress(addressId, formData);
            closeModal();
        }
    };

    if (addressLoading) return <LoadingPage />;

    return (
        <NewAddressFormWrapper>
            <div className="modal">
                <div className="modal-content">
                    <Button type="button" className="top-close-btn" onClick={closeModal} style={{ marginLeft: "auto", marginRight: "5rem" }} >
                        <IoClose />
                    </Button>
                    <div className="address-form-container">
                        <div className="form-wrapper">
                            <h4>Edit Address</h4>
                            <form className="address-form" onSubmit={handleSubmit} noValidate>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="example@example.com"
                                        />
                                        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter 10-digit phone number"
                                        required
                                    />
                                    {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.address && <div className="error-message">{formErrors.address}</div>}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="street">Street</label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.street && <div className="error-message">{formErrors.street}</div>}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.city && <div className="error-message">{formErrors.city}</div>}
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="country">Country</label>
                                        <select
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option>India</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                        </select>
                                        {formErrors.country && <div className="error-message">{formErrors.country}</div>}
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="state">State</label>
                                        <select
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option>Delhi</option>
                                            <option>Texas</option>
                                            <option>New York</option>
                                        </select>
                                        {formErrors.state && <div className="error-message">{formErrors.state}</div>}
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="zip">Zip</label>
                                        <input
                                            type="tel"
                                            id="zip"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.zip && <div className="error-message">{formErrors.zip}</div>}
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <Button type="submit">{addressLoading ? <ActionLoading /> : "Update"}</Button>
                                    <Button type="button" className="close-btn" onClick={closeModal}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </NewAddressFormWrapper>
    );
};

export default EditSavedAddress;

const NewAddressFormWrapper = styled.section`
margin: 3rem 0;

margin-bottom:30px;

.address-form-container {
    width: 100%;
    max-width: 700px;
    height:auto;
    margin: 0 auto;
    padding: 30px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h3 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}

h4 {
    font-size: 20px;
    color: #444;
    margin-bottom: 15px;
}

.input-group {
    margin-bottom: 20px;
}

label {
    text-align: left !important;
    font-weight: bold;
    color: #555;
}

input[type="text"], input[type="email"], input[type="tel"], select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    margin-top: 8px;
}

.error-message {
    color: #d9534f;
    font-size: 14px;
    margin-top: 5px;
}

.modal {
  display: flex ! important;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  justify-content: center;
  align-items: center;
  z-index: 3;    
}

.modal-content {
  width: 100%;
  height:100%;
  border-radius: none ! important;
  padding:5rem 0 !important;
  margin: 0 auto;
  text-align: left !important;
  overflow-y: scroll;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
}

.top-close-btn {
  background-color: #e74c3c;
  color: #fff;
  padding: 1rem !important;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size:20px !important;
  }

  &:hover {
      background-color: #c0392b;
  }
}

.close-btn {
  background: #ccc;
  color: #333;
}

.close-btn:hover {
  background: #bbb;
}

.contact-form {
      width: 100%;
      margin: auto;

      .text-success{
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        color:#38c8a8;
        margin-bottom: 3rem;
      }

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;
        margin-bottom: 3rem;

        input {
          border-radius: 1rem;
        }

        .img-container {
          width: 200px;

          img {
            width: 100%;
            height: auto;
          }
        }

        select{
        border-radius: 0.5rem;
        border:none;
        outline:none;
        padding: 1.6rem 2.4rem;
        box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      
          .select--option {
            padding:1rem;
          }
        }

        .feature-container {
          display: flex;
          gap: 3rem;
          justify-content:start;
          align-items: center;
          padding: 1.6rem 2.4rem;
          box-shadow: ${({ theme }) => theme.colors.shadowSupport};
          border-radius: 1rem;
        
          label {
            font-size: 1.2rem;
          }
        }

        textarea {
          border-radius: 1rem;
          resize: none;
        }

        Button {
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
    }
`
