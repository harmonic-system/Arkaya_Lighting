const productReducer = (state, action) => {

    switch (action.type) {

        case "APPLICATION_LOADING":
            return {
                ...state,
                applicationLoading: true,
                applicationError: null,
            }

        case "GET_APPLICATIONS":
            return {
                ...state,
                applicationLoading: false,
                application: action.payload.data,
                applicationError: null,
            }

        case "GET_APPLICATIONS_ERROR":
            return {
                ...state,
                applicationLoading: false,
                applicationError: action.payload,
                application: [],
            }

        case "CARAOUSEL_LOADING":
            return {
                ...state,
                caraouselLoading: true,
                caraouselError: null,
            }

        case "GET_CARAOUSEL":
            return {
                ...state,
                caraouselLoading: false,
                caraousel: action.payload.data,
                caraouselError: null,
            }

        case "GET_CARAOUSEL_ERROR":
            return {
                ...state,
                caraouselLoading: false,
                caraouselError: action.payload,
                caraousel: [],
            }

        case "PRODUCT_LOADING":
            return {
                ...state,
                productLoading: true,
                productError: null,
            }

        case "GET_PRODUCTS":
            return {
                ...state,
                productLoading: false,
                products: action.payload.data,
                productError: null,
            }

        case "GET_PRODUCTS_ERROR":
            return {
                ...state,
                productLoading: false,
                productError: action.payload,
                products: [],
            }

        case "SINGLE_PRODUCT_LOADING":
            return {
                ...state,
                isSingleLoading: true,
                singleProductError: null,
            }

        case "GET_SINGLE_PRODUCTS":
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload.data,
                singleProductError: null,
            }

        case "GET_SINGLE_PRODUCTS_ERROR":
            return {
                ...state,
                isSingleLoading: false,
                singleProductError: action.payload,
                singleProduct: {},
            }
    }

}

export default productReducer