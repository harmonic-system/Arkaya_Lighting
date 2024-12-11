// OrderSuccess.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth-context'; // Assuming you have auth context
import toast from 'react-hot-toast';
import styled from 'styled-components';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const { token } = useAuthContext();  // Ensure the user is logged in

    useEffect(() => {
        if (!token) {
            toast.error('You are not logged in. Please login first.');
            navigate('/login');  // Redirect to login if user is not logged in
        }
    }, [token, navigate]);

    return (
        <>
            <OrderSuccessWrapper>
                <div className="container">
                    <h1 className="title">Order Success!</h1>
                    <p className="message">Your payment has been successfully processed. Thank you for shopping with us!</p>
                    <div className="order-buttons">
                        <button onClick={() => navigate('/')} className="button">Go to Home</button>
                        <button onClick={() => navigate('/user/orders')} className="button">Order</button>
                    </div>
                </div>
            </OrderSuccessWrapper>
        </>

    );
};

export default OrderSuccess;

const OrderSuccessWrapper = styled.section`
  .container {
    text-align: center;
    padding: 20px;
    background-color: #f1f7ff;
    border-radius: 10px;
    margin-top: 50px;
  }

  .title {
    font-size: 24px;
    color: #2d6a4f;
  }

  .message {
    font-size: 18px;
    color: #5c6b73;
    text-align: center;
  }

  .order-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
   }

  .button {
    margin-top: 20px;
    background-color: #0077ff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #005bb5;
  }
`;


