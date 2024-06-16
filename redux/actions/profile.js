import { setAlert } from '../actions/alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  GET_REPOS,
} from './types';

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
    let token = null;
    if(typeof window !== "undefined") {
        token = localStorage.token;
    }

    try {
        const res = await fetch('/api/profile/me', {
            headers: {
                'x-auth-token': token,
            }
        });

        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: GET_PROFILE,
                payload: response.profile,
            });
        } 
        else {
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await fetch('/api/profile', {
            method: "GET",
        });

        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: GET_PROFILES,
                payload: response,
            });
        } else {
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// Get profile by Id
export const getProfileById = (userId) => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await fetch(`/api/profile/user/${userId}`, {
            method: "GET"
        });

        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: GET_PROFILE,
                payload: response,
            });
        } else {
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// Get Github Repos
export const getRepos = (username) => async (dispatch) => {
    try {
        const res = await fetch(`/api/profile/github/${username}`);

        const response = await res.json();

        console.log(res, response);

        if(res.ok) {
            dispatch({
                type: GET_REPOS,
                payload: response,
            });
        } else {
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
    let token = null;
    if(typeof window !== "undefined") {
        token = localStorage.token;
    }

    try {
        console.log(formData);
        const res = await fetch('/api/profile', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/JSON',
                'x-auth-token': token,
            },
        });

        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: GET_PROFILE,
                payload: response,
            });

            dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

            if (!edit) {
                history.push('/dashboard');
            }
        } else {
            response.forEach((error) => dispatch(setAlert(error.message, 'danger')));

            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
    let token = null;
    if(typeof window !== "undefined") {
        token = localStorage.token;
    }

    try {
        const res = await fetch('/api/profile/experience', {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/JSON',
                'x-auth-token': token
            },
        });

        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: response,
            });

            dispatch(setAlert('Experience Added', 'success'));
            history.push('/dashboard');
        } else {
            response.forEach((error) => dispatch(setAlert(error.message, 'danger')));
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
    let token = null;
    if(typeof window !== "undefined") {
        token = localStorage.token;
    }

    try {
        const res = await fetch('/api/profile/education', {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/JSON',
                'x-auth-token': token
            },
        });

        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: response,
            });

            dispatch(setAlert('Education Added', 'success'));
            history.push('/dashboard');
        } else {
            response.forEach((error) => dispatch(setAlert(error.message, 'danger')));
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

    // Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
    let token = null;
    if(typeof window !== "undefined") {
        token = localStorage.token;
    }
    try {
        const res = await fetch(`/api/profile/experience/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token,
            },
        });

        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: response,
            });
            dispatch(setAlert('Experience Removed', 'success'));
        } else {
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

    // Delete Education
export const deleteEducation = (id) => async (dispatch) => {
    let token = null;
    if(typeof window !== "undefined") {
        token = localStorage.token;
    }
    try {
        const res = await fetch(`/api/profile/education/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token,
            },
        });

        const response = await res.json();

        if(res.ok) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: response,
            });
            dispatch(setAlert('Education Removed', 'success'));
        } else {
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: response.message, status: res.status },
            });
        }
    } catch (error) {
        console.error(error);
    }
};

    // Delete Account & Profile
export const deleteAccount = () => async (dispatch) => {
    let token = null;
    if(typeof window !== "undefined") {
        token = localStorage.token;
    }
    if (window.confirm('Are you sure? This cannot be undone!')) {
        try {
            const res = await fetch('/api/profile', {
                method: 'DELETE',
                headers: {
                    'x-auth-token': token
                },
            });

            if(res.ok) {
                dispatch({ type: CLEAR_PROFILE });
                dispatch({ type: DELETE_ACCOUNT });

                dispatch(setAlert('Your Account has been deleted'));
            } else {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { message: res.statusText, status: res.status },
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
};