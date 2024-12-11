import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components"
import { Button } from '../styles/Button';
import { useAuthContext } from '../context/auth-context';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { server } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Please Wait...")
    try {
      const response = await axios.post(`${server}/api/v1/auth/forgot-password`,
        { email }
      );
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!')
    }
  };

  return (
    <>
      <ForgetPasswordWrapper>
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="login-title">
              <h2>Forgot Password</h2>
            </div>
            {/* <p className="auth-description">
              
            </p> */}
            <form onSubmit={handleSubmit} className="login-form">
              <h3>Enter your registered email, and we'll send you a password reset link.</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="form-button">Send Reset Link</Button>
            </form>
          </div>
        </div>
      </ForgetPasswordWrapper>
    </>

  );
};

export default ForgetPassword;

const ForgetPasswordWrapper = styled.section`
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

