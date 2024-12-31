const adminReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true,
            }
        case "SUCCESS":
            return {
                ...state,
                isLoading: false,
            }
        case "GETALLUSERS":
            return {
                ...state,
                isLoading: false,
                alluser: action.payload.data
            }
        case "GETALLNEWSLETTERS":
            return {
                ...state,
                isLoading: false,
                allNewsletter: action.payload.data
            }
        case "GETALLCONTACTS":
            return {
                ...state,
                isLoading: false,
                allContact: action.payload.data
            }
        case "GETALLPRODUCTQUERIES":
            return {
                ...state,
                isLoading: false,
                allQuerry: action.payload.data
            }
        case "SINGALCAROUSEL":
            return {
                ...state,
                isLoading: false,
                singleCarousel: action.payload.data
            }
        case "SINGALAPPLICATION":
            return {
                ...state,
                isLoading: false,
                singleApplication: action.payload.data
            }
        case "SINGALPRODUCT":
            return {
                ...state,
                isLoading: false,
                singleProduct: action.payload.data
            }
        case "SINGALPATNER":
            return {
                ...state,
                isLoading: false,
                singlePatner: action.payload.data
            }
        case "SINGALTHEMECATEGORY":
            return {
                ...state,
                isLoading: false,
                singleThemeCategory: action.payload.data
            }

        default:
            return state
    }
}

export default adminReducer;