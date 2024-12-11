import { createContext, useContext, useReducer } from "react";
import contactReducer from "../reducers/contact-reducer";
import toast from "react-hot-toast";
import { useAuthContext } from "./auth-context";
import axios from "axios";

const ContactContext = createContext()

const initialValue = {
    loading: false,
    message: null,
    error: null,
    success: false,
}

const ContactProvider = ({ children }) => {

    const [state, dispatch] = useReducer(contactReducer, initialValue)
    const { server } = useAuthContext()

    const newsletter = async (email) => {

        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/normal/newsletter`,
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS", payload: { message } })
            toast.success(message)
        } catch (error) {
            // console.log(error.response.data.message);
            dispatch({ type: "SET_ERROR", payload: error.response.data.message })
            toast.error(error?.response?.data?.message)
        }
    }

    const contactHandler = async (contactUser) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/normal/contact`,
                contactUser,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS", payload: { message } })
            toast.success(message)
        } catch (error) {
            // console.log(error.response.data.message);
            dispatch({ type: "SET_ERROR", payload: error.response.data.message })
            toast.error(error?.response?.data?.message)
        }
    }

    const handleQuerySubmit = async (completeQueryData) => {
        // console.log(completeQueryData);
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/normal/productquery`,
                completeQueryData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS", payload: { message } })
            toast.success(message)
        } catch (error) {
            // console.log(error.response.data.message);
            dispatch({ type: "SET_ERROR", payload: error.response.data.message })
            toast.error(error?.response?.data?.message)
        }
    }


    return (
        <ContactContext.Provider value={{ loading: state.loading, message: state.message, error: state.error, success: state.success, newsletter, contactHandler,handleQuerySubmit }}>
            {children}
        </ContactContext.Provider>
    )
}

const useContactContext = () => {
    const ContactContextValue = useContext(ContactContext)

    if (!ContactContextValue) {
        throw new Error("Contact Context used outside of the Provider")
    }

    return ContactContextValue
}


export { ContactContext, ContactProvider, useContactContext }