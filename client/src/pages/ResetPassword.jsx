import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import styled from "styled-components"
import { Button } from '../styles/Button';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/auth-context';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(true)
    const [showConPass, setShowConPass] = useState(true)
    const [inputTypePass, setInputTypePass] = useState("password")
    const [inputTypeConPass, setInputTypeConPass] = useState("password")
    const { server } = useAuthContext();

    const navigate = useNavigate()

    const toggleInputPass = () => {
        setInputTypePass((prev) => (prev === "password" ? "text" : "password"))
        setShowPass((pre) => !pre)
    }
    const toggleInputConPass = () => {
        setInputTypeConPass((prev) => (prev === "password" ? "text" : "password"))
        setShowConPass((pre) => !pre)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!")
            return;
        }

        try {
            const response = await axios.post(`${server}/api/v1/auth/reset-password/${token}`,
                { newPassword }
            );
            toast.success(response.data.message)
            navigate("/")
        } catch (error) {
          toast.dismiss()
            toast.error(error.response?.data?.message || 'Something went wrong!')
        }
    };

    return (
        <>
            <ResetPasswordWrapper>
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="login-title">
                            <h2>Reset Password</h2>
                        </div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h3>Enter and confirm your new password.</h3>
                            <div className="password-container">
                                <input className="" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} placeholder="Password" type={inputTypePass} name="password" required />
                                {showPass ? <FaEye className="password-eye" onClick={toggleInputPass} /> : <FaEyeSlash className="password-eye" onClick={toggleInputPass} />}
                            </div>
                            <div className="password-container">
                                <input className="" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirm Password" type={inputTypeConPass} name="confirmPassword" required />
                                {showConPass ? <FaEye className="password-eye" onClick={toggleInputConPass} /> : <FaEyeSlash className="password-eye" onClick={toggleInputConPass} />}
                            </div>
                            <Button type="submit" className="form-button">Reset Password</Button>
                        </form>
                    </div>
                </div>
            </ResetPasswordWrapper>
        </>

    );
};

export default ResetPassword;

const ResetPasswordWrapper = styled.section`
/* The popup overlay to dim the background */
.popup-overlay {
  width: 100vw;
  height: 90vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* The popup box itself */
.popup-content {
  background-color: #f6f8fa;
  padding: 30px;
  border-radius: 10px;
  width: max(30vw, 300px);
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: popup-animation 0.3s ease-out;
}

.login-title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5rem;
}

.login-title h2 {
  font-size: max(2vw, 18px);
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
}

.login-form input {
  width: 100% !important;
  border-radius: 10px;
  outline: none;
}

.password-container {
  width: 100%;
  position: relative;
}

.password-eye {
  position: absolute;
  top: 35%;
  right: 3rem;
  font-size: 15px;
  cursor: pointer;
}

.form-button {
  width: 100%;
}

.login-form p span {
  color: #ffc221;
}

/* Popup animation to make it look smoother */
@keyframes popup-animation {
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
`

