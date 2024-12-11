const cartReducer = (state, action) => {

    switch (action.type) {

        case 'SET_CART':
            return {
                ...state,
                items: action.payload.items,
                totalCartPrice: action.payload.totalCartPrice,
                error: null
            };
        case 'RESET_CART':
            return {
                ...state,
                items: [],
                totalCartPrice: 0,
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

export default cartReducer;