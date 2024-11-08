const authReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_TOKEN":
            return {
                ...state,
                isAuthenticated: !!action.payload.token,
                token: action.payload.token,
            }

        case "AUTH_LOADING":
            return {
                ...state,
                loading: true,
            }

        case "REGISTER":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                loading: false,
                error: null,
            };

        case "REGISTER_ERROR":
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false,
                error: action.payload,
            }

        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                loading: false,
                error: null,
            }

        case "LOGIN_ERROR":
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false,
                error: action.payload,
            }

        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
            }

        case "LOAD_USER_DATA":
            return {
                ...state,
                user: action.payload.data,
                token: action.payload.token,
                loading: false,
                error: null,
            }

        default:
            return state
    }

}

export default authReducer;