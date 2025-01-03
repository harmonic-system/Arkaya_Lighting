import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./product-context";
import categoryReducer from "../reducers/category-reducer";

const CategoryContext = createContext();

const initialState = {
    allProducts: [],
    filterProducts: [],
    searchProducts: [],
    themeProducts: [],
    themeCategory: "",
    themeProductsSubCategory: [],
    isCategoryLoading: true,
    category: [],
    grid_view: true,
    filters: {
        text: "",
        options: "",
        model: "",
        sku: "",
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

    const setHeroCategoryProduct = (searchText) => {
        localStorage.setItem("heroSearchProduct", searchText)
        dispatch({ type: "UPDATE_HERO_FILTERS_PRODUCTS", payload: { searchText } });
    }

    const getHeroSearchProducts = useCallback(() => {
        const searchText = localStorage.getItem("heroSearchProduct");
        dispatch({ type: "UPDATE_HERO_FILTERS_PRODUCTS", payload: { searchText } });
    }, [])

    useEffect(() => {
        getHeroSearchProducts();
    }, [state.allProducts, getHeroSearchProducts]);

    const setThemeCategoryProduct = (themeProductsCategory) => {
        localStorage.setItem("landingmenu", themeProductsCategory)
        dispatch({ type: "SET_LANDING_PAGE_FILTERED_PRODUCT", payload: { themeProductsCategory } });
    }

    const getThemeCategoryProducts = useCallback(() => {
        const themeProductsCategory = localStorage.getItem("landingmenu");
        dispatch({ type: "SET_LANDING_PAGE_FILTERED_PRODUCT", payload: { themeProductsCategory } });
    }, [])

    useEffect(() => {
        getThemeCategoryProducts();
    }, [state.allProducts, getThemeCategoryProducts]);

    const setThemeSubCategoryProducts = (themeProductsSubCategory) => {
        dispatch({ type: "SET_LANDING_PAGE_SUB_CATEGORY_PRODUCT", payload: { themeProductsSubCategory } });
    }

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
                updateFilterValue,
                setHeroCategoryProduct,
                getHeroSearchProducts,
                setThemeCategoryProduct,
                getThemeCategoryProducts,
                setThemeSubCategoryProducts
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
