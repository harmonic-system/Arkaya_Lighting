const categoryReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_ALL_PRODUCTS":
            return {
                ...state,
                allProducts: [...action.payload],
                // filterProducts: [...action.payload],
            };
        case "LOADING_CATEGORIES":
            return {
                ...state,
                isCategoryLoading: true,
            };
        case "GET_ALL_CATEGORIES":
            return {
                ...state,
                isCategoryLoading: false,
                category: action.payload
            };
        case "GET_CATEGORY_PRODUCTS":
            const { allProducts } = state
            const { text } = state.filters;
            let tempProducts = [...allProducts]
            const { category } = action?.payload;
            let newtempProducts = tempProducts?.filter((item) => item?.productCategory === category)
            if (text) {
                newtempProducts = newtempProducts.filter((item) => {
                    return item?.productname?.toLowerCase().includes(text.toLowerCase())
                })
            }
            return {
                ...state,
                filterProducts: newtempProducts,
            };
        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            };

        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            };
        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value
                }
            };

        default:
            return state
    }
}

export default categoryReducer