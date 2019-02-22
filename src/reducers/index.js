import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { AUTH_USER } from '../actions';

const INITIAL_AUTH_STATE = {
  token: null,
  error: null,
  isSignedIn: false,
};

const auth = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case AUTH_USER: {
      const { token, error } = action.payload;
      return { token, error, isSignedIn: !!token };
    }
    default:
      return state;
  }
};

export default combineReducers({
  auth,
  form,
});
