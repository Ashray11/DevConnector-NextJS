import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_PROFILE, LOGOUT } from "./types";
import { setAlert } from "./alert";

// Load User
export const loadUser = () => async dispatch => {
    let token = null;
    if (typeof window !== "undefined") {
        token = localStorage.token;
    }
  
    try {
        const res = await fetch("/api/auth", {
            headers: {
                'x-auth-token': token,
            },
        });
  
        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: USER_LOADED,
                payload: response.user,
            });
        } else {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    try {
        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response
            });

            dispatch(loadUser());
        } else {
            response.forEach(error => {
                dispatch(setAlert(error.message, 'danger'));
            });
    
            dispatch({
                type: REGISTER_FAIL
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// Login User
export const login = (email, password) => async dispatch => {  
    try {
        const res = await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();

        if (res.ok) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response,
            });
    
            dispatch(loadUser());
        } else {
            response.forEach(error => {
                dispatch(setAlert(error.message, 'danger'));
            });

            dispatch({
                type: LOGIN_FAIL,
            });
        }
    } catch (error) {
        console.error(error);
    }
};
  
// Logout / Clear Profile
export const logout = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE,
    });

    dispatch({
        type: LOGOUT,
    });
};