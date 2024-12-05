import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../context/auth-context';

const NewAddressForm = () => {
    const { addAddress } = useAuthContext()
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

    const [formErrors, setFormErrors] = useState({});

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
            // console.log(formData);
            addAddress(formData)
        }
    };

    return (
        <NewAddressFormWrapper>
            <div className="address-form-container">
                <div className="form-wrapper">
                    <h4>Add New Address</h4>
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
                        <button className="submit-btn" type="submit">Add Address</button>
                    </form>
                </div>
            </div>
        </NewAddressFormWrapper>
    );
};

export default NewAddressForm;

const NewAddressFormWrapper = styled.section`
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

.submit-btn {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.submit-btn:hover {
    background-color: #0056b3;
}

`
