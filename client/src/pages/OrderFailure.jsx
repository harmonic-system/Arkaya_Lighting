// OrderFailure.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth-context'; // Assuming you have auth context
import toast from 'react-hot-toast';

const OrderFailure = () => {
    const navigate = useNavigate();
    const { token } = useAuthContext();  // Ensure the user is logged in

    useEffect(() => {
        if (!token) {
            toast.error('You are not logged in. Please login first.');
            navigate('/login');  // Redirect to login if user is not logged in
        }
    }, [token, navigate]);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Order Failed</h1>
            <p style={styles.message}>There was an issue processing your payment. Please try again later or contact support.</p>
            <button onClick={() => navigate('/checkout')} style={styles.button}>Try Again</button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8d7da',
        borderRadius: '10px',
        marginTop: '50px',
    },
    title: {
        fontSize: '24px',
        color: '#d9534f',
    },
    message: {
        fontSize: '18px',
        color: '#721c24',
    },
    button: {
        marginTop: '20px',
        backgroundColor: '#d9534f',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default OrderFailure;
