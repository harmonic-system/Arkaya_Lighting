import { createContext, useContext, useReducer } from "react";
import cartReducer from "../reducers/cart-reducer";

const CartContext = createContext()

const initialState = {
    products: [],
    totalPrice: () => 0,
    addProduct: () => { },
    removeProduct: () => { },
    updateProduct: () => { }
}

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)


    return (
        <CartContext.Provider value={{
            products: [
                { id: 1, name: 'Product 1', price: 100 },
                { id: 2, name: 'Product 2', price: 200 },
                { id: 3, name: 'Product 3', price: 300 },
            ],
            totalPrice: () => products.reduce((acc, curr) => acc + curr.price, 0),
            addProduct: (product) => setProducts([...products, product]),
            removeProduct: (productId) => setProducts(products.filter(product => product.id !== productId)),
            updateProduct: (updatedProduct) => setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product)),
        }}>
            {children}
        </CartContext.Provider>
    )
}

const useCartContext = () => {
    const CartContextvalue = useContext(CartContext)
    if (!CartContextvalue) {
        throw new Error("Cart Context is used outside of a Provider")
    }
    return CartContextvalue
}

export { CartContext, CartProvider, useCartContext }