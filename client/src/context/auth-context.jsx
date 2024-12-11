import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import authReducer from "../reducers/auth-reducer";
import toast from "react-hot-toast";
const server = import.meta.env.VITE_SERVER;

const AuthContext = createContext()

const initialState = {
    loading: false,
    isAuthenticated: false,
    token: null,
    addressLoading: false,
    address: [],
    singleAddress: {},
    user: null,
    error: null,
    order: []
}

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState)

    const [selectedAddress, setSelectedAddress] = useState(null);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get(`${server}/api/v1/auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { data } = response.data;
            dispatch({ type: "LOAD_USER_DATA", payload: { data, token } });
        } catch (error) {
            console.log("Failed to fetch user data", error?.message);
            logout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch({ type: "LOAD_TOKEN", payload: { token } });
            fetchUserData(token);
        }

    }, [state.isAuthenticated]);

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
            toast.dismiss()
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
            toast.dismiss()
            toast.error(error.response?.data?.message)
        }
    }

    const logout = async () => {
        localStorage.removeItem("token")
        dispatch({ type: "LOGOUT", payload: "Logout Successfully" })
        toast.success("Logout Successfully")
    }

    const getAddress = async () => {
        dispatch({ type: "ADDRESS_LOADING" })
        try {
            const { data } = await axios.get(`${server}/api/v1/address/getalladdress`, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                },
            });
            dispatch({ type: "ALL_ADDRESS", payload: { data } })
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    const addAddress = async (addressData) => {
        dispatch({ type: "ADDRESS_LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/address/addaddress`,
                addressData,
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    },

                })
            const { message } = response.data
            dispatch({ type: "ADDRESS_SUCCESS" })
            toast.success(message)
            getAddress()
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "An error occurred while adding the address. Please try again later.";

            dispatch({ type: "ADDRESS_ERROR", payload: { message: errorMessage } });
            console.error("Error adding address:", error);
        }
    };

    const getSingleAddress = async (addressId) => {
        dispatch({ type: "ADDRESS_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/address/getSingleAddress/${addressId}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    },

                })
            const { data } = response.data
            dispatch({ type: "SINGLE_ADDRESS_SUCCESS", payload: { data } })
        } catch (error) {
            console.log(error);
        }
    };

    const updateAddress = async (addressId, updatedData) => {
        try {
            const { data } = await axios.put(`${server}/api/v1/address/updateAddress/${addressId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    },
                }
            )
            getAddress()
            toast.success(data.message)
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            const { data } = await axios.delete(`${server}/api/v1/address/deleteAddress/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                },
            })
            getAddress()
            toast.success(data.message)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${server}/api/v1/order/getorder`, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                },
            });
            const { data } = response.data
            dispatch({ type: "ORDER_LOADING", payload: { data } })
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch orders. Please try again."
            );
        }
    };

    // Cancel Order Function
    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.delete(`${server}/api/v1/order/cancelorder/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                },
            });
            toast.success(response.data.message);
            fetchOrders()
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to cancel the order. Please try again."
            );
        }
    };

    // console.log(selectedAddress);


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
            server,
            addressLoading: state.addressLoading,
            address: state.address,
            singleAddress: state.singleAddress,
            addAddress,
            getSingleAddress,
            updateAddress,
            deleteAddress,
            getAddress,
            selectedAddress,
            setSelectedAddress,
            order: state.order,
            fetchOrders,
            cancelOrder
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