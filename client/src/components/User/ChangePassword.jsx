import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/auth-context";

const ChangePassword = () => {

    const { server, token } = useAuthContext()


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOldPass, setShowOldPass] = useState(true)
    const [showPass, setShowPass] = useState(true)
    const [showConPass, setShowConPass] = useState(true)
    const [inputTypeOldPass, setInputTypeOldPass] = useState("password")
    const [inputTypePass, setInputTypePass] = useState("password")
    const [inputTypeConPass, setInputTypeConPass] = useState("password")

    const toggleInputOldPass = () => {
        setInputTypeOldPass((prev) => (prev === "password" ? "text" : "password"))
        setShowOldPass((pre) => !pre)
    }

    const toggleInputPass = () => {
        setInputTypePass((prev) => (prev === "password" ? "text" : "password"))
        setShowPass((pre) => !pre)
    }
    const toggleInputConPass = () => {
        setInputTypeConPass((prev) => (prev === "password" ? "text" : "password"))
        setShowConPass((pre) => !pre)
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        if (!newPassword || !oldPassword) {
            toast.error("All fields are required.");
            return;
        }        

        try {
            const response = await axios.post(`${server}/api/v1/auth/change-password`,
                 {oldPassword, newPassword} ,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            const { message } = response.data
            toast.success(message)
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    };

    return (
        <>
            <ChangePasswordWrapper>
                <div className="container">
                    <div className="change-password-container">
                        <h2 className="title">Change Password</h2>
                        <form onSubmit={handleChangePassword} className="form">
                            <div className="form-group">
                                <label htmlFor="oldPassword">Old Password</label>
                                <div className="password-container">
                                    <input
                                        type={inputTypeOldPass}
                                        id="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        placeholder="Enter your old password"
                                        className="input"
                                    />
                                    {showOldPass ? <FaEye className="password-eye" onClick={toggleInputOldPass} /> : <FaEyeSlash className="password-eye" onClick={toggleInputOldPass} />}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <div className="password-container">
                                    <input
                                        type={inputTypePass}
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter your new password"
                                        className="input"
                                    />
                                    {showPass ? <FaEye className="password-eye" onClick={toggleInputPass} /> : <FaEyeSlash className="password-eye" onClick={toggleInputPass} />}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <div className="password-container">
                                    <input
                                        type={inputTypeConPass}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your new password"
                                        className="input"
                                    />
                                    {showConPass ? <FaEye className="password-eye" onClick={toggleInputConPass} /> : <FaEyeSlash className="password-eye" onClick={toggleInputConPass} />}
                                </div>
                            </div>
                            <Button type="submit" className="submit-button">
                                Change Password
                            </Button>
                        </form>
                    </div>
                </div>
            </ChangePasswordWrapper>
        </>

    );
};

export default ChangePassword;

const ChangePasswordWrapper = styled.section`
.change-password-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  font-family: "Arial", sans-serif;
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
  transition: all 0.3s ease;
}

.password-container {
  width: 100%;
  position: relative;
}

.password-eye {
  position: absolute;
  top: 28%;
  right: 3rem;
  font-size: 15px;
  cursor: pointer;
}

.submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: all 0.3s ease;
}
`
