import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUp_Login.css";
import { Button } from "../styles/Button";
import { useAuthContext } from "../context/auth-context";
import toast from "react-hot-toast";


const SignUp = () => {

    const [isOpen, setIsOpen] = useState(true);
    const { signUp } = useAuthContext()

    const navigate = useNavigate()

    // Function to toggle popup
    const togglePopup = () => {
        setIsOpen(!isOpen);
        navigate("/")
    };


    const [showPass, setShowPass] = useState(true)
    const [showConPass, setShowConPass] = useState(true)
    const [inputTypePass, setInputTypePass] = useState("password")
    const [inputTypeConPass, setInputTypeConPass] = useState("password")

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        password: "",
        confirmPassword: "",
        term_condition: false
    })


    const toggleInputPass = () => {
        setInputTypePass((prev) => (prev === "password" ? "text" : "password"))
        setShowPass((pre) => !pre)
    }
    const toggleInputConPass = () => {
        setInputTypeConPass((prev) => (prev === "password" ? "text" : "password"))
        setShowConPass((pre) => !pre)
    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const contain = (password) => {
            const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
            return regex.test(password);
        };

        if (!contain(user.password)) {
            toast.dismiss()
            return toast.error("Password must contain at least one uppercase letter and one number");
        }

        if (user.password !== user.confirmPassword) {
            toast.dismiss()
            return toast.error("Password and Confirm Password must be same")
        }

        if (user.phone.length < 10) {
            toast.dismiss()
            return toast.error("Phone number must be 10 digits long")
        }

        if (!user.term_condition) {
            toast.dismiss()
            return toast.error("Please accept our terms and conditions")
        }

        try {
            await signUp(user)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="login-title">
                            <h1>Glad to have you!</h1>
                            <button onClick={togglePopup} className="close-popup-btn">X</button>
                        </div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h3>Register With Us</h3>

                            <input type="text" placeholder="Name" onChange={handleChange} value={user.name} name="name" required />
                            <input type="email" placeholder="Email" onChange={handleChange} value={user.email} name="email" required />
                            <input type="number" placeholder="Phone" onChange={handleChange} value={user.phone} name="phone" required />
                            <input type="text" placeholder="Organization (optional)" onChange={handleChange} value={user.organization} name="organization" />
                            <div className="password-container">
                                <input className="" onChange={handleChange} value={user.password} placeholder="Password" type={inputTypePass} name="password" required />
                                {showPass ? <FaEye className="password-eye" onClick={toggleInputPass} /> : <FaEyeSlash className="password-eye" onClick={toggleInputPass} />}
                            </div>
                            <div className="password-container">
                                <input className="" onChange={handleChange} value={user.confirmPassword} placeholder="Confirm Password" type={inputTypeConPass} name="confirmPassword" required />
                                {showConPass ? <FaEye className="password-eye" onClick={toggleInputConPass} /> : <FaEyeSlash className="password-eye" onClick={toggleInputConPass} />}
                            </div>
                            <div className="policy-checkbox">
                                <input type="checkbox" name="term_condition" id="" value={user.term_condition} onChange={handleChange} />
                                <p>By Clicking You Agree Our <Link to="/term&condition">Terms_Condition</Link> ,<Link to="/privacypolicy"> Privacy_Policy</Link> and <Link to="/shippingandreturn">Shipping&Return</Link> </p>
                            </div>
                            <Button type="submit" className="form-button">Sign up</Button>
                            <p>Already have an account ? <NavLink to="/login"><span>Login</span></NavLink></p>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
};

export default SignUp;