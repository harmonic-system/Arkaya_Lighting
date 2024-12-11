const wishListReducer = (state, action) => {

    switch (action.type) {

        case 'GET_WISHLIST':
            return {
                ...state,
                items: action.payload.items,
                error: null
            };
        case 'SET_WISHLIST':
            return {
                ...state,
                error: null
            };
        case 'RESET_WISHLIST':
            return {
                ...state,
                items: [],
                error: null
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default wishListReducer;