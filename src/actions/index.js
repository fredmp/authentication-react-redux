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

const errorDescription = ({ response }) => {
  const generalDescription = 'General error';
  if (!response) return generalDescription;
  if (response.status === 500) return 'Server error';
  if (response.status === 401) return 'Email or password invalid';
  if (response.data) return response.data.error || generalDescription;
  return generalDescription;
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
    dispatch({ type: AUTH_USER, payload: null });
    dispatchNotification(dispatch, {
      description: errorDescription(error),
      title: 'Signup Error',
      type: 'error',
    });
  }
};

export const signin = (formValues, callback) => async dispatch => {
  try {
    const response = await Axios.post(`${baseURL}/signin`, formValues);
    const token = response.headers.authorization;
    dispatch({ type: AUTH_USER, payload: token });
    localStorage.setItem('token', token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_USER, payload: null });
    dispatchNotification(dispatch, {
      description: errorDescription(error),
      title: 'Sign in Error',
      type: 'error',
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: AUTH_USER, payload: null });
  dispatchNotification(dispatch, {
    description: 'You successfully signed out',
    title: 'Sign out',
    general: true,
  });
};
