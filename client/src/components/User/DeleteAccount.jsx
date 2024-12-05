import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import axios from 'axios';
import { useAuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {

  const { server, token, logout } = useAuthContext()
  const navigate = useNavigate()

  const [confirmationInput, setConfirmationInput] = useState("");

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    // Check if the user has entered the confirmation keyword
    if (confirmationInput !== "DELETE") {
      toast.dismiss()
      toast.error("Please type 'DELETE' to confirm account deletion.");
      return;
    }

    try {
      toast.loading("Please Wait...")
      const response = await axios.delete(`${server}/api/v1/auth/delete-account`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      const { message } = response.data
      logout()
      toast.dismiss()
      toast.success(message)
      navigate("/")
    } catch (error) {
      toast.dismiss()
      toast.error(error.response.data.message)
    }
  };

  return (
    <>
      <DeleteAccountWrapper>
        <div className="delete-account-container">
          <h2 className="title">Delete Account</h2>
          <p className="warning-text">
            Deleting your account is a permanent action and cannot be undone. Please
            confirm to proceed.
          </p>
          <form onSubmit={handleDeleteAccount} className="form">
            <div className="form-group">
              <label htmlFor="confirmationInput">Type 'DELETE' to confirm:</label>
              <input
                type="text"
                id="confirmationInput"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                placeholder="Type DELETE"
                className="input"
              />
            </div>
            <button type="submit" className="delete-button">
              Delete Account
            </button>
          </form>
        </div>
      </DeleteAccountWrapper>
    </>
  );
};

export default DeleteAccount;

const DeleteAccountWrapper = styled.section`
/* General container styling */
.delete-account-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-family: "Arial", sans-serif;
  text-align: center;
}

/* Title styling */
.title {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Warning text styling */
.warning-text {
  font-size: 16px;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* Form styling */
.form {
  display: flex;
  flex-direction: column;
}

/* Form group styling */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

/* Label styling */
.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
  cursor: text;
}

/* Input styling */
.input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input:focus {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Button styling */
.delete-button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #f9d423;
  background: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-button:hover {
  background: #ff4e50;
  color: #fff;
}
`
