import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuthContext } from "../context/auth-context";
import { useCartContext } from "../context/cart-context";

const PaymentWithPayzapp = () => {
    const { server, token, selectedAddress } = useAuthContext(); // Fetch selected address
    const { totalCartPrice } = useCartContext(); // Fetch total price from cart

    const handlePayment = async () => {
        try {

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(
                `${server}/api/v1/transactions/initiate`,
                {
                    amount: totalCartPrice,
                    address: selectedAddress
                },
                { headers }
            );
            window.location.href = response.data.paymentUrl;
        } catch (err) {
            console.error(err);
            alert("Payment initiation failed");
        }
    };

    return (
        <>
            {/* <div>
                <h1>Order Page</h1>
                <input
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handlePayment}>Pay Now</button>
            </div> */}

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
        </>
    );
};

export default PaymentWithPayzapp;



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