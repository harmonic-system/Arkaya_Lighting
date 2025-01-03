const categoryReducer = (state, action) => {
    const { allProducts } = state;

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
            const { text, options, model, sku } = state.filters;
            let tempProducts = [...allProducts]
            const { category } = action?.payload;
            let newtempProducts = tempProducts?.filter((item) => item?.productCategory === category)

            if (text) {
                newtempProducts = newtempProducts.filter((item) => {
                    return item?.productname?.toLowerCase().includes(text?.toLowerCase())
                })
            }
            if (model) {
                newtempProducts = newtempProducts.filter((item) => {
                    return item?.model?.toLowerCase().includes(model?.toLowerCase())
                })
            }
            if (sku) {
                newtempProducts = newtempProducts.filter((item) => {
                    return item?.sku?.toLowerCase().includes(sku?.toLowerCase())
                })
            }
            if (options) {
                newtempProducts = newtempProducts.filter((item) => {
                    return item?.IndoorOutdoor === options
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
        case "UPDATE_HERO_FILTERS_PRODUCTS":
            const { searchText } = action.payload
            let newAllProducts = [...allProducts]

            newAllProducts = newAllProducts.filter((item) => {
                const searchString = searchText?.toLowerCase() || '';

                const desFields = item?.des
                    ? Object.entries(item.des)
                        .filter(([key]) => key)
                        .map(([key, value]) => `${key} ${value}`)
                        .join(' ')
                    : '';

                const combinedFields = `${item?.productname || ''} ${item?.productCategory || ''} ${item?.model || ''} ${item?.sku || ''} ${desFields}`.toLowerCase();

                return combinedFields.includes(searchString);
            });

            return {
                ...state,
                searchProducts: newAllProducts,
            };

        case "SET_LANDING_PAGE_FILTERED_PRODUCT":
            let tempLandingProducts = [...allProducts];
            const { themeProductsCategory } = action?.payload;

            let newtempLandingProducts = tempLandingProducts?.filter((item) => item?.themeCategory === themeProductsCategory)
            const subcategory = [...new Set(newtempLandingProducts.map((item) => item.productCategory))]

            return {
                ...state,
                themeProductsSubCategory: subcategory,
                themeProducts: newtempLandingProducts,
                themeCategory: themeProductsCategory
            };

        case "SET_LANDING_PAGE_SUB_CATEGORY_PRODUCT":
            let themePro = [...allProducts]
            const { themeProductsSubCategory } = action?.payload;
            const {themeCategory} = state

            let newthemePro = themePro?.filter((item) => item?.productCategory === themeProductsSubCategory)

            if (themeProductsSubCategory === "All") {
                newthemePro = themePro?.filter((item) => item?.themeCategory === themeCategory)
            }

            return {
                ...state,
                themeProducts: newthemePro,
            };

        default:
            return state
    }
}

export default categoryReducer