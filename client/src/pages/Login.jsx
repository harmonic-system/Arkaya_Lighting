import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUp_Login.css";
import { Button } from "../styles/Button";
import { useAuthContext } from "../context/auth-context";

const Login = () => {

    const [isOpen, setIsOpen] = useState(true);
    const { login } = useAuthContext()
    const navigate = useNavigate()

    // Function to toggle popup
    const togglePopup = () => {
        setIsOpen(!isOpen);
        navigate("/")
    };

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [showPass, setShowPass] = useState(true)
    const [inputTypePass, setInputTypePass] = useState("password")

    const toggleInputPass = () => {
        setInputTypePass((prev) => (prev === "password" ? "text" : "password"))
        setShowPass((pre) => !pre)
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await login(user)
            navigate("/")
        } catch (error) {
            console.log(error);
        };
    }

    return (
        <div>
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="login-title">
                            <h1>Welcome Back !</h1>
                            <button onClick={togglePopup} className="close-popup-btn">X</button>
                        </div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h3>Login</h3>
                            <input type="email" placeholder="Email" onChange={handleChange} value={user.email} name="email" required />
                            <div className="password-container">
                                <input className="" onChange={handleChange} value={user.password} placeholder="Password" type={inputTypePass} name="password" required />
                                {showPass ? <FaEye className="password-eye" onClick={toggleInputPass} /> : <FaEyeSlash className="password-eye" onClick={toggleInputPass} />}
                            </div>
                            <div className="forget-pass">
                                <Link to="/user/forgot-password">Forget Password</Link>
                            </div>
                            <Button type="submit" className="form-button">Login</Button>
                            <p>Not have a account? Create a new account <NavLink to="/signup"><span>Sign Up</span></NavLink></p>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;