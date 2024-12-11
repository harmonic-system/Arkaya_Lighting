import React, { useEffect } from "react";
import { useAuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const AdminWrapper = ({ children }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (user) {
            if (!token || !user?.isAdmin) {
                navigate("/");
            }
        }
    }, [token, user, navigate]);

    if (!token || !user?.isAdmin) {
        // Prevent rendering of children during redirection
        return null;
    }

    return (
        <>
            {children}
        </>
    );
};

export default AdminWrapper;
