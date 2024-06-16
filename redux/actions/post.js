import { setAlert } from '../actions/alert';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  DELETE_COMMENT,
  ADD_COMMENT,
} from './types';

// Get all posts
export const getPosts = () => async (dispatch) => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.token;
  }

  try {
    const res = await fetch('/api/posts', {
      headers: {
        'x-auth-token': token,
      },
    });

    const response = await res.json();

    if(res.ok) {
      dispatch({
        type: GET_POSTS,
        payload: response,
      });
    } else {
      dispatch({
        type: POST_ERROR,
        payload: { message: response.message, status: res.status },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.token;
  }

  try {
    const res = await fetch(`/api/posts/like/${postId}`, {
      method: "PUT",
      headers: {
        'x-auth-token': token,
      },
    });

    const response = await res.json();

    if(res.ok) {
      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: response },
      });
    } else {
      dispatch({
        type: POST_ERROR,
        payload: { message: response.message, status: res.status },
      });
    }
  } catch (error) {
    console.error(error);
  } 
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.token;
  }

  try {
    const res = await fetch(`/api/posts/unlike/${postId}`, {
      method: "PUT",
      headers: {
        'x-auth-token': token,
      },
    });

    const response = await res.json();

    if(res.ok) {
      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: response },
      });
    } else {
      dispatch({
        type: POST_ERROR,
        payload: { message: response.message, status: res.status },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.token;
  }

  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        'x-auth-token': token,
      }
    });

    if(res.ok) {
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });

      dispatch(setAlert('Post Removed', 'success'));
    } else {
      dispatch({
        type: POST_ERROR,
        payload: { message: res.statusText, status: res.status },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.token;
  }

  try {
    const res = await fetch('/api/posts', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/JSON',
      }
    });

    const response = await res.json();

    if(res.ok) {
      dispatch({
        type: ADD_POST,
        payload: response,
      });

      dispatch(setAlert('Post Created', 'success'));
    } else {
      dispatch({
        type: POST_ERROR,
        payload: { message: response.message, status: res.status },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Get post
export const getPost = (postId) => async (dispatch) => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.token;
  }

  try {
    const res = await fetch(`/api/posts/${postId}`, {
      headers: {
        'x-auth-token': token,
      }
    });

    const response = await res.json();

    if(res.ok) {
      dispatch({
        type: GET_POST,
        payload: response,
      });
    } else {
      dispatch({
        type: POST_ERROR,
        payload: { message: res.statusText, status: res.status },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.token;
  }

  try {
    const res = await fetch(`/api/posts/comment/${postId}`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/JSON',
      }
    });

    const response = await res.json();

    if(res.ok) {
      dispatch({
        type: ADD_COMMENT,
        payload: response,
      });

      dispatch(setAlert('Comment Added', 'success'));
    } else {
      dispatch({
        type: POST_ERROR,
        payload: { message: res.statusText, status: res.status },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.token;
  }
  try {
    const res = await fetch(`/api/posts/comment/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        'x-auth-token': token,
      }
    });

    if(res.ok) {
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });

      dispatch(setAlert('Comment Removed', 'success'));
    } else {
      dispatch({
        type: POST_ERROR,
        payload: { message: res.statusText, status: res.status },
      });
    }
  } catch (error) {
    console.error(error);
  }
};