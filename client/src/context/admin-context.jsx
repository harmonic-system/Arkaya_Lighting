import { createContext, useContext, useReducer } from "react";
import adminReducer from "../reducers/admin-reducer";
import axios from "axios";
import { useAuthContext } from "./auth-context";
import toast from "react-hot-toast";
import { useProductContext } from "./product-context";

const AdminContext = createContext()

const initialState = {
    isLoading: false,
    error: false,
    alluser: [],
    allContact: [],
    allNewsletter: [],
    allQuerry: [],
    singleCarousel: {},
    singleApplication: {},
    singleProduct: {},
    singlePatner: {},
    singleThemeCategory: {},
}

const AdminProvider = ({ children }) => {

    const [state, dispatch] = useReducer(adminReducer, initialState)
    const { server, token } = useAuthContext()
    const { getAllApplications, getAllHomeCarousel, getAllProduct, getAllPatner, getAllThemeCategory } = useProductContext()

    const getAllUsers = async () => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getallusers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "GETALLUSERS", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const updateUserRole = async (userId, newRole) => {
        try {
            const response = await axios.put(`${server}/api/v1/admin/makeadmin/${userId}`,
                { newRole },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            const { message } = response.data
            toast.dismiss()
            toast.success(message)
            getAllUsers()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    };


    const deleteUser = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deleteuser/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            // console.log(data);
            toast.dismiss()
            toast.success(message)
            getAllUsers()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getAllNewsLetters = async () => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getallnewsletters`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "GETALLNEWSLETTERS", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const deleteNewsLetter = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deletenewsletter/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            // console.log(data);
            toast.dismiss()
            toast.success(message)
            getAllNewsLetters()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getAllContacts = async () => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getallcontacts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "GETALLCONTACTS", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const deleteContact = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deletecontact/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            // console.log(data);
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllContacts()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getAllProductQuery = async () => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getallproductqueries`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "GETALLPRODUCTQUERIES", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const deleteProductQuery = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deleteproductquery/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            // console.log(data);
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllProductQuery()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const addCarousel = async (carouselData) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/admin/addhomecarousel`,
                carouselData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            // console.log(data);
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllHomeCarousel()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getSingalCarousel = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getsingalhomecarousel/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "SINGALCAROUSEL", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const updateCarousel = async (id, carouselData) => {

        dispatch({ type: "LOADING" })
        try {
            const response = await axios.put(`${server}/api/v1/admin/updatehomecarousel/${id}`,
                carouselData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllHomeCarousel()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const deleteCarousel = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deletehomecarousel/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllHomeCarousel()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const addApplication = async (applicationData) => {

        dispatch({ type: "LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/admin/addapplication`,
                applicationData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            // console.log(data);
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllApplications()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getSingalApplication = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getsingalapplication/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "SINGALAPPLICATION", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const updateApplication = async (id, applicationData) => {

        dispatch({ type: "LOADING" })
        try {
            const response = await axios.put(`${server}/api/v1/admin/updateapplication/${id}`,
                applicationData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllApplications()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const deleteApplication = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deleteapplication/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllApplications()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const addProduct = async (productData) => {
        // console.log(productData);

        dispatch({ type: "LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/admin/addsingalProduct`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            const { message } = response.data
            // console.log(data);
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllProduct()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getSingalProduct = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getsingalProduct/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "SINGALPRODUCT", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const updateProduct = async (id, productData) => {

        dispatch({ type: "LOADING" })
        try {
            const response = await axios.put(`${server}/api/v1/admin/updatesingalProduct/${id}`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllProduct()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const deleteProduct = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deletesingalProduct/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllProduct()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const addPatner = async (patnerData) => {
        // console.log(patnerData);
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/admin/addpatner`,
                patnerData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            const { message } = response.data
            // console.log(data);
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllPatner()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getSingalPatner = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getsingalPatner/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "SINGALPATNER", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const updatePatner = async (id, patnerData) => {

        dispatch({ type: "LOADING" })
        try {
            const response = await axios.put(`${server}/api/v1/admin/updatesingalPatner/${id}`,
                patnerData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllPatner()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const deletePatner = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deletesingalPatner/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllPatner()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const addThemeCategory = async (themeCategoryData) => {
        // console.log(themeCategoryData);
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.post(`${server}/api/v1/admin/addthemecategory`,
                themeCategoryData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            const { message } = response.data
            // console.log(data);
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllThemeCategory()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getSingalThemeCategory = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/admin/getsingalThemeCategory/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            const { data } = response.data
            dispatch({ type: "SINGALTHEMECATEGORY", payload: { data } })
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const updateThemeCategory = async (id, themeCategoryData) => {

        dispatch({ type: "LOADING" })
        try {
            const response = await axios.put(`${server}/api/v1/admin/updatesingalThemeCategory/${id}`,
                themeCategoryData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllThemeCategory()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const deleteThemeCategory = async (id) => {
        dispatch({ type: "LOADING" })
        try {
            const response = await axios.delete(`${server}/api/v1/admin/deletesingalThemeCategory/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { message } = response.data
            dispatch({ type: "SUCCESS" })
            toast.dismiss()
            toast.success(message)
            getAllThemeCategory()
        } catch (error) {
            // console.log(error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    return (
        <AdminContext.Provider value={{
            ...state,
            getAllUsers,
            updateUserRole,
            deleteUser,
            getAllNewsLetters,
            deleteNewsLetter,
            getAllContacts,
            deleteContact,
            getAllProductQuery,
            deleteProductQuery,
            addCarousel,
            getSingalCarousel,
            updateCarousel,
            deleteCarousel,
            addApplication,
            getSingalApplication,
            updateApplication,
            deleteApplication,
            addProduct,
            getSingalProduct,
            updateProduct,
            deleteProduct,
            addPatner,
            getSingalPatner,
            updatePatner,
            deletePatner,
            addThemeCategory,
            getSingalThemeCategory,
            updateThemeCategory,
            deleteThemeCategory
        }}>
            {children}
        </AdminContext.Provider>
    )
}

const useAdminContext = () => {
    const adminContextValue = useContext(AdminContext)
    if (!adminContextValue) {
        throw new Error("useAdminContext used outside of the Provider")
    }

    return adminContextValue
}

export { AdminContext, AdminProvider, useAdminContext }