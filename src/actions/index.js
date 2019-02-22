import Axios from 'axios';

const baseURL = 'http://localhost:5000';

export const AUTH_USER = 'AUTH_USER';
export const NOTIFICATION = 'NOTIFICATION';

const dispatchNotification = (
  dispatch,
  { description, title = 'Message', type = 'info', general = false },
) => {
  const payload = description ? { title, description, type, general } : null;
  dispatch({ type: NOTIFICATION, payload });
  if (payload) {
    // Remove notification after 10 seconds
    setTimeout(() => {
      dispatch({ type: NOTIFICATION, payload: null });
    }, 10000);
  }
};

export const notify = payload => dispatch => {
  dispatchNotification(dispatch, payload);
};

export const signup = (formValues, callback) => async dispatch => {
  try {
    const response = await Axios.post(`${baseURL}/signup`, formValues);
    const token = response.headers.authorization;
    dispatch({ type: AUTH_USER, payload: token });
    localStorage.setItem('token', token);
    callback();
  } catch (error) {
    const { response } = error;
    const description = response ? response.data.error : error.toString();
    dispatch({ type: AUTH_USER, payload: null });
    dispatchNotification(dispatch, { description, title: 'Signup Error', type: 'error' });
  }
};
