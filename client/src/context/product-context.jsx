import { createContext, useContext, useEffect, useReducer } from "react";
import productReducer from "../reducers/product-reducer";
import axios from "axios";
import { useAuthContext } from "./auth-context";

const ProductContext = createContext()

const initialState = {
    application: [],
    applicationLoading: false,
    applicationError: null,
    caraousel: [],
    caraouselLoading: false,
    caraouselError: null,
    products: [],
    productLoading: false,
    productError: null,
    singleProduct: {},
    isSingleLoading: false,
    singleProductError: null,
    patner: [],
    patnerLoading: false,
    patnerError: null,
    themeCategory: [],
    themeCategoryLoading: false,
    themeCategoryError: null,
}

const ProductProvider = ({ children }) => {

    const [state, dispatch] = useReducer(productReducer, initialState)
    const { server } = useAuthContext()

    const getAllApplications = async () => {
        dispatch({ type: "APPLICATION_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/products/getapplication`)
            const { data } = response.data
            dispatch({ type: "GET_APPLICATIONS", payload: { data } })
        } catch (error) {
            dispatch({ type: "GET_APPLICATIONS_ERROR", payload: error?.response?.data?.message })
        }
    }

    const getAllHomeCarousel = async () => {
        dispatch({ type: "CARAOUSEL_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/products/gethomecarousel`)
            const { data } = response.data
            dispatch({ type: "GET_CARAOUSEL", payload: { data } })
        } catch (error) {
            dispatch({ type: "GET_CARAOUSEL_ERROR", payload: error?.response?.data?.message })
        }
    }

    const getAllProduct = async () => {
        dispatch({ type: "PRODUCT_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/products/getproducts`)
            const { data } = response.data
            dispatch({ type: "GET_PRODUCTS", payload: { data } })
        } catch (error) {
            dispatch({ type: "GET_PRODUCTS_ERROR", payload: error?.response?.data?.message })
        }
    }

    const getSingleProduct = async (id) => {
        dispatch({ type: "SINGLE_PRODUCT_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/products/getsingleproducts/${id}`)
            const { data } = response.data
            dispatch({ type: "GET_SINGLE_PRODUCTS", payload: { data } })
        } catch (error) {
            dispatch({ type: "GET_SINGLE_PRODUCTS_ERROR", payload: error?.response?.data?.message })
        }
    }

    const getAllPatner = async () => {
        dispatch({ type: "PATNER_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/products/getpatners`)
            const { data } = response.data
            dispatch({ type: "GET_PATNERS", payload: { data } })
        } catch (error) {
            dispatch({ type: "GET_PATNERS_ERROR", payload: error?.response?.data?.message })
        }
    }

    const getAllThemeCategory = async () => {
        dispatch({ type: "THEMECATEGORY_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/products/getthemeCategory`)
            const { data } = response.data
            dispatch({ type: "GET_THEMECATEGORY", payload: { data } })
        } catch (error) {
            dispatch({ type: "GET_THEMECATEGORY_ERROR", payload: error?.response?.data?.message })
        }
    }

    useEffect(() => {
        getAllApplications()
        getAllHomeCarousel()
        getAllProduct()
        getAllPatner()
        getAllThemeCategory()
    }, [])

    return (
        <ProductContext.Provider value={{
            ...state,
            getAllApplications,
            getAllHomeCarousel,
            getAllProduct,
            getSingleProduct,
            getAllPatner,
            getAllThemeCategory
        }}>
            {children}
        </ProductContext.Provider>
    )
}

const useProductContext = () => {
    const ProductContextValue = useContext(ProductContext)
    if (!ProductContextValue) {
        throw new Error("Product Context is used outside of the Provider")
    }
    return ProductContextValue
}

export { ProductContext, ProductProvider, useProductContext }