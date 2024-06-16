import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGOUT, DELETE_ACCOUNT } from "@redux/actions/types";

const isServer = typeof window === "undefined";

const initialState = {
    token: !isServer ? localStorage.getItem('token') : null,
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {...state, isAuthenticated: true, loading: false, user: payload};

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            !isServer && localStorage.setItem('token', payload.token);
            return {...state, ...payload, isAuthenticated: true, loading: false};

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:
            !isServer && localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated: false, loading: false};

        default:
            return state
    };
};