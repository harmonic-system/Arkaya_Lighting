import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/auth-context';
import { useCartContext } from '../context/cart-context';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DropIn from 'braintree-web-drop-in-react';

const ContinueToPayment = () => {

    const { server, selectedAddress } = useAuthContext();  // Fetch selected address
    const { totalCartPrice } = useCartContext();  // Fetch total price from cart
    const [clientToken, setClientToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card');  // Default payment method is 'card'
    const [upiId, setUpiId] = useState('');  // State to store UPI ID
    const [upiError, setUpiError] = useState('');  // State to handle UPI validation error

    // Fetch client token from backend (for Braintree)
    useEffect(() => {
        const fetchClientToken = async () => {
            try {
                const res = await axios.get(`${server}/api/v1/transactions/getToken`);
                setClientToken(res.data.clientToken);
            } catch (error) {
                toast.error('Failed to load client token');
            }
        };

        fetchClientToken();
    }, []);

    // console.log(clientToken);
    // console.log(paymentMethod);

    // Validate UPI ID
    const validateUpiId = (upiId) => {
        const regex = /^[a-zA-Z0-9._%-+]{1,256}@[a-zA-Z0-9.-]{2,256}\.[a-zA-Z]{2,4}$/;  // Simple UPI ID regex
        return regex.test(upiId);
    };

    // Handle payment process
    const handlePayment = async () => {
        if (paymentMethod === 'card' && instance) {
            const { nonce } = await instance.requestPaymentMethod();
            try {
                const response = await axios.post(`${server}/api/v1/transactions/payment`, {
                    paymentMethodNonce: nonce,
                    amount: totalCartPrice,
                    paymentMethod: paymentMethod, // Specify the method as 'card'
                    address: selectedAddress,
                });

                if (response.data.success) {
                    toast.success('Payment successful!');
                } else {
                    toast.error(response.data.error || 'Payment failed!');
                }
            } catch (error) {
                toast.error(error.response?.data?.error || 'An error occurred during payment');
            }
        } else if (paymentMethod === 'upi') {
            if (!upiId) {
                setUpiError('Please enter a valid UPI ID');
                return;
            }
            try {
                const response = await axios.post(`${server}/api/v1/transactions/payment`, {
                    upiId: upiId,
                    amount: totalCartPrice,
                    paymentMethod: 'upi', // Specify the method as 'upi'
                    address: selectedAddress,
                });

                if (response.data.success) {
                    toast.success('Payment successful!');
                } else {
                    toast.error(response.data.error || 'Payment failed!');
                }
            } catch (error) {
                toast.error(error.response?.data?.error || 'An error occurred during payment');
            }
        } else if (paymentMethod === 'paypal') {
            // Handle PayPal payment flow if necessary
            toast.error('PayPal integration not implemented yet');
        }
    };

    return (
        <ContinueToPaymentWrapper>
            <div className="pay-now-container">
                <h1 className="title">Complete Your Payment</h1>
                <div className="details-card">
                    <h2>Total Price</h2>
                    <p className="price">${totalCartPrice.toFixed(2)}</p>
                </div>
                <div className="details-card">
                    <h2>Shipping Address</h2>
                    <p className="address">{selectedAddress.name}</p>
                    <p className="address">{selectedAddress.email}</p>
                    <p className="address">{selectedAddress.phone}</p>
                    <p className="address">{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</p>
                </div>

                <div className="payment-method-selector">
                    <label>
                        <input
                            type="radio"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                        />
                        Credit/Debit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="upi"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                        />
                        UPI (Google Pay, PhonePe)
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                        />
                        PayPal
                    </label>
                </div>

                {paymentMethod === 'card' && clientToken && (
                    <DropIn
                        options={{ authorization: clientToken }}
                        onInstance={(instance) => setInstance(instance)}
                    />
                )}

                {paymentMethod === 'upi' && (
                    <div className="upi-input-container">
                        <label htmlFor="upi-id">Enter UPI ID</label>
                        <input
                            type="text"
                            id="upi-id"
                            placeholder="example@upi"
                            value={upiId}
                            onChange={(e) => {
                                setUpiId(e.target.value);
                                setUpiError(''); // Clear error when user types
                            }}
                        />
                        {upiError && <p className="error">{upiError}</p>}
                    </div>
                )}

                <button className="pay-now-button" onClick={handlePayment}>
                    Pay Now
                </button>
            </div>
        </ContinueToPaymentWrapper>
    );
};

export default ContinueToPayment;

const ContinueToPaymentWrapper = styled.section`
    .pay-now-container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .title {
        font-size: 2rem;
        margin-bottom: 20px;
        color: #333;
    }

    .details-card {
        background: #ffffff;
        margin: 15px 0;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .details-card h2 {
        margin-bottom: 10px;
        font-size: 1.2rem;
        color: #555;
    }

    .price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #27ae60;
    }

    .address {
        font-size: 1rem;
        color: #555;
        word-wrap: break-word;
    }

    .payment-method-selector {
        margin: 20px 0;
        font-size: 1rem;
    }

    .upi-input-container {
        margin-top: 20px;
        text-align: left;
        padding: 10px;
    }

    .upi-input-container input {
        padding: 10px;
        margin-top: 5px;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .error {
        color: red;
        font-size: 0.9rem;
        margin-top: 5px;
    }

    .pay-now-button {
        background: #27ae60;
        color: #ffffff;
        border: none;
        padding: 15px 30px;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .pay-now-button:hover {
        background: #219150;
    }
`;
