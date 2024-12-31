import { createContext, useContext, useEffect, useReducer, useState } from "react";
import wishListReducer from "../reducers/wishlist-reducer";
import { useAuthContext } from "./auth-context";
import axios from "axios";
import toast from "react-hot-toast";

const WishListContext = createContext()

const initialState = {
    items: [],
    error: null
};

const WishListProvider = ({ children }) => {

    const [state, dispatch] = useReducer(wishListReducer, initialState)
    const { server, user, token } = useAuthContext()

    const fetchWishList = async () => {
        try {
            const { data } = await axios.get(`${server}/api/v1/wishlist/getwishlist`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch({ type: 'GET_WISHLIST', payload: { items: data?.items } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error?.message });
            // console.log(error);
        }
    };

    const addToWishList = async (productId) => {
        try {
            const { data } = await axios.post(`${server}/api/v1/wishlist/add`, { productId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({ type: 'SET_WISHLIST' });
            fetchWishList()
            toast.dismiss()
            toast.success(data?.message)
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error?.message });
            toast.dismiss()
            toast.error(error?.response?.data?.message)
        }
    };

    const removeFromWishList = async (productId) => {
        try {
            const { data } = await axios.post(`${server}/api/v1/wishlist/remove`, { productId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({ type: 'SET_WISHLIST' });
            fetchWishList()
            toast.dismiss()
            toast.success(data.message)
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            toast.dismiss()
            toast.error(error.response?.data?.message)
        }
    };

    const resetWishList = async () => {
        try {
            const { data } = await axios.delete(`${server}/api/v1/wishlist/reset`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({ type: 'RESET_WISHLIST' });
            fetchWishList()
            toast.dismiss()
            toast.success(data?.message)
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error?.response?.data?.message || error.message });
            toast.dismiss()
            toast.error(error.response?.data?.message)
        }
    };

    useEffect(() => {
        if (user) {
            fetchWishList()
        }
    }, [user]);


    return (
        <WishListContext.Provider value={{
            items: state.items,
            error: state.error,
            fetchWishList,
            addToWishList,
            removeFromWishList,
            resetWishList
        }}>
            {children}
        </WishListContext.Provider>
    );
}

const useWishListContext = () => {
    const WishListContextvalue = useContext(WishListContext)
    if (!WishListContextvalue) {
        throw new Error("WishList Context is used outside of a Provider")
    }
    return WishListContextvalue
}

export { WishListContext, WishListProvider, useWishListContext }