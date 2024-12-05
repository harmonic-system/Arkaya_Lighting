import { createContext, useContext, useEffect, useReducer, useState } from "react";
import cartReducer from "../reducers/cart-reducer";
import { useAuthContext } from "./auth-context";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext()

const initialState = {
    items: [],
    totalCartPrice: 0,
    error: null
};

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)
    const { server, user } = useAuthContext()

    const fetchCart = async () => {
        try {
            const { data } = await axios.get(`${server}/api/v1/cart/getcart/${user?._id}`);
            dispatch({ type: 'SET_CART', payload: { items: data?.items, totalCartPrice: data?.totalCartPrice } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error?.message });
        }
    };

    const addToCart = async (userId, productId, quantity) => {
        try {
            const { data } = await axios.post(`${server}/api/v1/cart/add`, { userId, productId, quantity });
            dispatch({ type: 'SET_CART', payload: { items: data?.cart?.items, totalCartPrice: data?.cart?.totalCartPrice } });
            toast.success(data?.message)
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error?.message });
            toast.error(error?.response?.data?.message)
        }
    };

    const removeFromCart = async (userId, productId) => {
        try {
            const { data } = await axios.post(`${server}/api/v1/cart/remove`, { userId, productId });
            dispatch({ type: 'SET_CART', payload: { items: data.cart.items, totalCartPrice: data.cart.totalCartPrice } });
            fetchCart()
            toast.success(data.message)
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            toast.error(error.response?.data?.message)
        }
    };

    const updateQuantity = async (userId, productId, quantity) => {
        try {
            const { data } = await axios.put(`${server}/api/v1/cart/update`, { userId, productId, quantity });
            dispatch({ type: 'SET_CART', payload: { items: data.cart.items, totalCartPrice: data.cart.totalCartPrice } });
            fetchCart()
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const resetCart = async () => {
        try {
            const { data } = await axios.delete(`${server}/api/v1/cart/reset/${user?._id}`);
            dispatch({ type: 'RESET_CART' });
            toast.success(data?.message)
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error?.response?.data?.message || error.message });
            toast.error(error.response?.data?.message)
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart()
        }
    }, [user]);


    return (
        <CartContext.Provider value={{
            cart: state.items,
            totalCartPrice: state.totalCartPrice,
            error: state.error,
            fetchCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            resetCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

const useCartContext = () => {
    const CartContextvalue = useContext(CartContext)
    if (!CartContextvalue) {
        throw new Error("Cart Context is used outside of a Provider")
    }
    return CartContextvalue
}

export { CartContext, CartProvider, useCartContext }