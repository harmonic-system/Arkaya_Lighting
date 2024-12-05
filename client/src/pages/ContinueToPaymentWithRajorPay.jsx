import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/auth-context';
import { useCartContext } from '../context/cart-context';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const rajorpayid = import.meta.env.RAZORPAY_KEY_ID;

const ContinueToPaymentWithRazorPay = () => {

    const { server, token, selectedAddress } = useAuthContext(); // Fetch selected address
    const { totalCartPrice } = useCartContext(); // Fetch total price from cart

    const navigate = useNavigate()

    const handlePayment = async () => {

        // const token = localStorage.getItem('token'); // Fetch token from localStorage for authentication
        if (!token) {
            toast.error('Please login to continue.');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post(
                `${server}/api/v1/transactions/payment`,
                {
                    amount: totalCartPrice,
                    address: selectedAddress,
                },
                { headers }
            );

            if (response.data.success) {
                // Initiate Razorpay Checkout for Card or UPI Payment
                const { orderId } = response.data;

                const options = {
                    key: rajorpayid, // Replace with your Razorpay Key ID
                    amount: totalCartPrice * 100, // Amount in paise
                    currency: 'INR',
                    name: 'ArkayaLighting',
                    description: 'Purchase Description',
                    order_id: orderId, // Razorpay order ID from backend
                    handler: function (paymentResponse) {
                        // Handle successful payment
                        console.log(paymentResponse);
                        toast.success('Payment successful!');
                    },
                    prefill: {
                        name: selectedAddress.name,
                        email: selectedAddress.email,
                        contact: selectedAddress.phone,
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                const razorpayInstance = new window.Razorpay(options);
                razorpayInstance.open();
            } else {
                toast.error(response.data.error || 'Payment initiation failed!');
            }
        } catch (error) {
            toast.error('Error processing payment');
        }
    };

    if (!selectedAddress) {
        navigate("/checkout")
    }

    return (
        <ContinueToPaymentWrapper>
            <div className="pay-now-container">
                <h1 className="title">Complete Your Payment</h1>
                <div className="details-card">
                    <h2>Total Price</h2>
                    <p className="price">₹{totalCartPrice?.toFixed(2)}</p>
                </div>
                <div className="details-card">
                    <h2>Shipping Address</h2>
                    <p className="address">{selectedAddress?.name}</p>
                    <p className="address">{selectedAddress?.email}</p>
                    <p className="address">{selectedAddress?.phone}</p>
                    <p className="address">
                        {selectedAddress?.address}, {selectedAddress?.city}, {selectedAddress?.state}, {selectedAddress?.zip}
                    </p>
                </div>

                <button className="pay-now-button" onClick={handlePayment}>
                    Pay Now
                </button>
            </div>
        </ContinueToPaymentWrapper>
    );
};

export default ContinueToPaymentWithRazorPay;

const ContinueToPaymentWrapper = styled.section`
    .pay-now-container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background: #f1f7ff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    .details-card {
        margin: 15px 0;
        padding: 15px;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .payment-method-selector label {
        margin-right: 15px;
        font-size: 1rem;
        cursor: pointer;
    }
    .card-input-container, .upi-input-container {
        text-align: left;
        margin-top: 20px;
    }
    .qr-code-container {
        margin-top: 20px;
        text-align: center;
    }
    .pay-now-button {
        background: #0077ff;
        color: #ffffff;
        border: none;
        padding: 15px 30px;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 20px;
        transition: 0.3s;
    }
    .pay-now-button:hover {
        background: #0056cc;
    }
`;


