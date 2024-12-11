const contactReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
                message: null,
                error: null,
                success:false,
            }

        case "SUCCESS":
            return {
                ...state,
                success:true,
                loading: false,
                message: action.payload.message,
                error: null,
            }

        case "SET_ERROR":
            return {
                ...state,
                loading: false,
                message: null,
                error: action.payload,
                success:false,
            }

        default:
            return state;
    }

}

export default contactReducer