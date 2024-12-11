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
    singleProductError: null
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

    useEffect(() => {
        getAllApplications()
        getAllHomeCarousel()
        getAllProduct()
    }, [])

    return (
        <ProductContext.Provider value={{
            application: state.application,
            applicationLoading: state.applicationLoading,
            applicationError: state.applicationError,
            caraousel: state.caraousel,
            caraouselLoading: state.caraouselLoading,
            caraouselError: state.caraouselError,
            products: state.products,
            productLoading: state.productLoading,
            productError: state.productError,
            singleProduct: state.singleProduct,
            isSingleLoading: state.isSingleLoading,
            singleProductError: state.singleProductError,
            getAllApplications,
            getAllHomeCarousel,
            getAllProduct,
            getSingleProduct
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