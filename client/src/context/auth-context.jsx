import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import authReducer from "../reducers/auth-reducer";
import toast from "react-hot-toast";
const server = import.meta.env.VITE_SERVER;

const AuthContext = createContext()

const initialState = {
    loading: false,
    isAuthenticated: false,
    token: null,
    user: null,
    error: null
}

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        const token = localStorage.getItem("token")        

        if (token) {
            dispatch({ type: "LOAD_TOKEN", payload: { token } })

            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${server}/api/v1/auth/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                    )
                    const { data } = response.data                                        
                    dispatch({ type: "LOAD_USER_DATA", payload: { data ,token} })
                } catch (error) {
                    console.log("Failed to fetch user data", error?.message);
                    logout();  
                }
            }
            fetchUserData()
        }
    }, [state.isAuthenticated])

    const signUp = async (userdetails) => {
        dispatch({ type: "AUTH_LOADING" })
        try {
            const { data } = await axios.post(`${server}/api/v1/auth/signup`,
                userdetails,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            const { token, message } = data

            localStorage.setItem("token", token)
            dispatch({ type: "REGISTER", payload: { token, message } })
            toast.success(message)
        } catch (error) {
            dispatch({
                type: "REGISTER_ERROR",
                payload: error.response?.data?.message || "SignUp Failed",
            })
            toast.error(error.response?.data?.message)
        }
    }

    const login = async (userdetails) => {
        dispatch({ type: "AUTH_LOADING" })
        try {
            const { data } = await axios.post(`${server}/api/v1/auth/login`,
                userdetails,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            const { token, message } = data

            localStorage.setItem("token", token)
            dispatch({ type: "LOGIN", payload: { token, message } })
            toast.success(message)
        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: error.response?.data?.message || "Login Failed",
            })
            toast.error(error.response?.data?.message)
        }
    }

    const logout = async () => {
        localStorage.removeItem("token")
        dispatch({ type: "LOGOUT", payload: "Logout Successfully" })
        toast.success("Logout Successfully")
    }    

    return (
        <AuthContext.Provider value={{
            loading: state.loading,
            isAuthenticated: state.isAuthenticated,
            token: state.token,
            user: state.user,
            error: state.error,
            signUp,
            login,
            logout,
            server
        }}>
            {children}
        </AuthContext.Provider>
    )
}



const useAuthContext = () => {
    const AuthContextValue = useContext(AuthContext)

    if (!AuthContextValue) {
        throw new Error("useAuthContext used outside of the Provider")
    }

    return AuthContextValue
}


export { AuthContext, AuthProvider, useAuthContext }