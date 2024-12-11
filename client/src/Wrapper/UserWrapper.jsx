import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWrapper = ({ children }) => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate("/login"); // Redirect to login if no token
        }
    }, [token, navigate]); // Dependency array ensures effect runs only when `token` or `navigate` changes


    if (!token) {
        return null; // Prevent rendering children until navigation completes
    }

    return (
        <>
            {children}
        </>
    );
};

export default UserWrapper;
