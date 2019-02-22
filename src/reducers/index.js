import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { AUTH_USER, NOTIFICATION } from '../actions';

const INITIAL_AUTH_STATE = {
  token: null,
  isSignedIn: false,
};

const auth = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case AUTH_USER: {
      return { token: action.payload, isSignedIn: !!action.payload };
    }
    default:
      return state;
  }
};

const notification = (state = null, action) => {
  switch (action.type) {
    case NOTIFICATION: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default combineReducers({
  form,
  auth,
  notification,
});
