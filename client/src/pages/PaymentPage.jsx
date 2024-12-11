import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuthContext } from '../context/auth-context';
import { useCartContext } from '../context/cart-context';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const rajorpayid = import.meta.env.RAZORPAY_KEY_ID; // Fetch Razorpay key from environment

const PaymentPage = () => {

    const { server, token, selectedAddress } = useAuthContext(); // Fetch selected address
    const { cart, totalCartPrice } = useCartContext();
    const navigate = useNavigate(); // Hook for navigation

    // Handler to process the payment on form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the user is logged in
        if (!token) {
            toast.error('Please login to continue.');
            // console.log('Payment failed: User not logged in.');
            return;
        }

        // Set headers for API requests
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        try {
            // Start the payment process
            toast.loading('Processing your payment...');
            console.log('Initiating payment process...');

            // Send request to backend to create Razorpay order
            const response = await axios.post(
                `${server}/api/v1/transactions/payment`,
                {
                    amount: totalCartPrice,
                    items: cart,
                    address: selectedAddress,
                },
                { headers }
            );

            const { orderId, amount } = response.data;
            console.log('Razorpay order created:', { orderId, amount });

            // Configure Razorpay checkout options
            const options = {
                key: rajorpayid, // Replace with your Razorpay key
                amount: amount * 100, // Convert to paise (Razorpay expects amount in paise)
                currency: 'INR',
                name: 'ArkayaLighting',
                description: 'Purchase Description',
                order_id: orderId, // Order ID created by backend
                handler: async function (response) {
                    console.log('Payment successful:', response);
                    toast.success('Payment successful! Verifying...');

                    try {
                        // Send payment details to the backend for verification
                        const verifyResponse = await axios.post(`${server}/api/v1/transactions/verify`, {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature
                        },
                            { headers }
                        );

                        if (verifyResponse.data.success) {
                            console.log('Payment verification successful:', verifyResponse.data);
                            toast.success('Payment verified and order confirmed!');
                            navigate('/user/order-success'); // Redirect to success page
                        } else {
                            console.error('Payment verification failed:', verifyResponse.data.error);
                            toast.error('Payment verification failed.');
                            navigate('/user/order-failure'); // Redirect to failure page
                        }
                    } catch (verifyError) {
                        console.error('Error during payment verification:', verifyError);
                        toast.error('Error verifying payment.');
                        navigate('/order-failure'); // Redirect to failure page
                    }
                },
                prefill: {
                    name: selectedAddress.name,
                    email: selectedAddress.email,
                    contact: selectedAddress.phone,
                },
                theme: {
                    color: '#3399cc', // Theme color for the Razorpay checkout window
                },
                method: ['upi', 'card', 'netbanking'],
            };

            // Open Razorpay checkout window
            const rzp = new window.Razorpay(options);
            rzp.open();

            toast.dismiss(); // Dismiss the loading toast once Razorpay checkout opens

        } catch (error) {
            console.error('Error creating payment order:', error);
            toast.error('Error processing payment.');
        }
    };

    // Redirect to checkout page if address is not selected
    if (!selectedAddress || selectedAddress === undefined || selectedAddress === null) {
        navigate("/checkout");
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

                <button className="pay-now-button" onClick={handleSubmit}>
                    Pay Now
                </button>
            </div>
        </ContinueToPaymentWrapper>
    );
};

export default PaymentPage;

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
