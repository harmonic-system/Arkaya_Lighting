import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./product-context";
import categoryReducer from "../reducers/category-reducer";

const CategoryContext = createContext();

const initialState = {
    allProducts: [],
    filterProducts: [],
    isCategoryLoading: true,
    category: [],
    grid_view: true,
    filters: {
        text: "",
    }
};

const CategoryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(categoryReducer, initialState);
    const { products } = useProductContext();

    const getUniqueCategories = useCallback(() => {
        dispatch({ type: "LOADING_CATEGORIES" });
        const uniqueCategories = Array.from(
            new Set(products.map((item) => item.productCategory))
        );
        dispatch({ type: "GET_ALL_CATEGORIES", payload: uniqueCategories });
    }, [products]);

    useEffect(() => {
        // Combined useEffect for loading products and getting categories
        dispatch({ type: "LOAD_ALL_PRODUCTS", payload: products });
        getUniqueCategories(); // This runs whenever products change
    }, [products, getUniqueCategories]);

    const setCategoryinlocalStorage = (category) => {
        // Update localStorage
        localStorage.setItem("selectedCategory", category);

        // Dispatch the action to set the category filter based on the new category
        dispatch({ type: "GET_CATEGORY_PRODUCTS", payload: { category } });
    };


    const getCategoryFilteredProducts = useCallback(() => {
        const category = localStorage.getItem("selectedCategory");
        dispatch({ type: "GET_CATEGORY_PRODUCTS", payload: { category } });
    }, []);

    useEffect(() => {
        getCategoryFilteredProducts();
    }, [state.allProducts, getCategoryFilteredProducts]);

    const setGridView = () => {
        return dispatch({ type: "SET_GRID_VIEW" });
    };

    // to set the list view
    const setListView = () => {
        return dispatch({ type: "SET_LIST_VIEW" });
    };

    const updateFilterValue = (e) => {
        const { name, value } = e.target
        dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
        getCategoryFilteredProducts()
    }

    // console.log(state.filters.text);
    // console.log(state.filterProducts);
    

    return (
        <CategoryContext.Provider
            value={{
                ...state,
                category: state.category,
                filterProducts: state.filterProducts,
                grid_view: state.grid_view,
                getCategoryFilteredProducts,
                setCategoryinlocalStorage,
                setGridView,
                setListView,
                updateFilterValue
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

const useCategoryContext = () => {
    const categoryContextValue = useContext(CategoryContext);

    if (!categoryContextValue) {
        throw new Error("Category Context used outside of the Provider");
    }

    return categoryContextValue;
};

export { CategoryContext, CategoryProvider, useCategoryContext };
