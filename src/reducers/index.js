import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { AUTH_USER } from '../actions';

const auth = (state = null, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  auth,
  form,
});
