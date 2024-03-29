import axios from 'axios';
import { API_URL } from '../config.js';
import {history} from '../App';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getAllPublished = ({ posts }) => posts.data.filter(post => post.status === 'published');
export const getPresent = ({posts}, id) => posts.present && posts.present.id === id ? posts.present : null;
export const getByEmail = ({posts, user}) => posts.data.filter(post => user && post.author === user.email);
export const getRequest = ({posts}) => posts.request;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_REQUEST = createActionName('START_REQUEST');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_POST_SUCCESS = createActionName('FETCH_POST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');
const SAVE_POST = createActionName('SAVE_POST');
const UPDATE_POST = createActionName('UPDATE_POST');
const DELETE_POST = createActionName('DELETE_POST');

/* action creators */
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchPostSuccess = payload => ({ payload, type: FETCH_POST_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const postSaved = payload => ({ payload, type: SAVE_POST });
export const postUpdated = payload => ({ payload, type: UPDATE_POST });
export const postDeleted = payload => ({ payload, type: DELETE_POST});

/* thunk creators */
export const fetchPublished = () => {
  return async (dispatch, getState) => {
    const {posts: {latestFetch, data, request } } = getState();
    const timePassed = Date.now() - latestFetch;
    const newBatch =  timePassed < 5 * 60 * 1000;
    if ((data.length > 0 && newBatch)
      || (request.type === 'LOAD_POSTS' && request.active)) {
      return;
    }
    dispatch(startRequest('LOAD_POSTS'));
    try {
      let res = await axios.get(`${API_URL}/posts`);
      dispatch(fetchSuccess(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const loadSingleReq = id => {
  return async dispatch => {
    dispatch(startRequest('LOAD_SINGLE'));
    try {
      let res = await axios.get(`${API_URL}/posts/${id}`);
      dispatch(fetchPostSuccess(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const savePostRequest = postData => {
  return async dispatch => {
    dispatch(startRequest('SAVE_POST'));
    try {
      const formData = new FormData();
      for (let [key, value] of Object.entries(postData)){
        formData.append(key, value);
      }
      const res = await axios.post(`${API_URL}/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data'},
      });
      dispatch(postSaved(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const updatePostRequest = (id, postData) => {
  return async dispatch => {
    dispatch(startRequest('UPDATE_POST'));
    try {
      const formData = new FormData();
      for (let [key, value] of Object.entries(postData)){
        formData.append(key, value);
      }
      const res = await axios.put(`${API_URL}/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data'},
      });
      dispatch(postUpdated(res.data));
      setTimeout(() => {history.push(`/post/${id}`);}, 3500);
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const deletePostRequest = id => {
  return async dispatch => {
    dispatch(startRequest('DELETE_POST'));
    try {
      const res = await axios.delete(`${API_URL}/posts/${id}`);
      dispatch(postDeleted(res.data._id));
      history.goBack();
    } catch (e) {
      dispatch (requestError(e.message || true));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case START_REQUEST: {
      return {
        ...statePart,
        request: {
          type: action.payload,
          active: true,
          error: false,
          success: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      const posts = action.payload.map(({_id, ...other}) => ({id: _id, ...other}));
      return {
        ...statePart,
        latestFetch: Date.now(),
        request: {
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
        data: posts,
      };
    }
    case FETCH_POST_SUCCESS: {
      const {_id, ...other} = action.payload;
      const postData = {id: _id, ...other};
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
        present: postData,
      };
    }
    case REQUEST_ERROR: {
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: action.payload,
          success: false,
        },
      };
    }
    case SAVE_POST: {
      const { _id: id, author, created, title, photo, status } = action.payload;
      const postData = {id, author, created, title, photo, status };
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
        data: statePart.data.length > 0 ? [...statePart.data, postData] : statePart.data,
      };
    }
    case UPDATE_POST: {
      const { _id: id, author, created, title, photo, status } = action.payload;
      const posts = statePart.data.length > 0
        ? statePart.data.map(post => post.id === id ? {id, author, created, title, photo, status } : post)
        : [];
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
        data: posts,
      };
    }
    case DELETE_POST: {
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
        data: statePart.data.filter(post => post.id !== action.payload),
      };
    }
    default:
      return statePart;
  }
};
