import axios from 'axios';
import {API_URL} from '../config';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getAllPublished = ({posts}) => posts.data.filter(post => post.status === 'published');
export const getPostById = ({posts}, id) => posts.data.find(post => post.id === id);
export const getByEmail = ({posts, user}) => posts.data.filter(post => user && user.type === 'genUser' && post.email === user.email);
export const getRequest = ({posts}) => posts.request;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_REQUEST = createActionName('START_REQUEST');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');
const SAVE_POST = createActionName('SAVE_POST');

/* action creators */
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const savedPost = payload => ({ payload, type: SAVE_POST });

/* thunk creators */
export const fetchPublished = () => {
  return async dispatch => {
    dispatch(startRequest('LOAD_POSTS'));
    try {
      let res = await axios.get(`${API_URL}/api/posts`);
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
      let res = await axios.get(`${API_URL}/api/posts/${id}`);
      dispatch(fetchSuccess(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const savePostRequest = postData => {
  return async dispatch => {
    dispatch(startRequest('SAVE_POST'));
    try {
      const res = axios.post(`${API_URL}/api/posts`, postData);
      dispatch(savedPost(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const updatePostRequest = (id, postData) => {
  return async dispatch => {
    dispatch(startRequest('UPDATE_POST'));
    try {
      const res = axios.put(`${API_URL}/api/posts/${id}`, postData);
      dispatch(savedPost(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
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
      const postsArray = Array.isArray(action.payload) ? action.payload : [action.payload];
      const postData = postsArray.map(({_id, ...other}) => ({id: _id, ...other}));
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
        data: postData,
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
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
      };
    }
    default:
      return statePart;
  }
};
