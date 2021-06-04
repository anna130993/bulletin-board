/* selectors */
export const getUser = ({user}) => user;

/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/$name`;

/* action types */
const SIGNIN = createActionName('SIGNIN');
const SIGNOUT = createActionName('SIGNOUT');

/* action creators */
export const signin = payload => ({payload, type: SIGNIN});
export const signout = payload => ({payload, type: SIGNOUT});

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case SIGNIN: {
      return action.payload;
    }
    case SIGNOUT: {
      return null;
    }
    default:
      return statePart;
  }
};
