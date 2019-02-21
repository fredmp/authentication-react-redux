import Axios from 'axios';

const baseURL = 'http://localhost:5000';

export const AUTH_USER = 'AUTH_USER';

export const signup = formValues => async dispatch => {
  const response = await Axios.post(`${baseURL}/signup`, formValues);
  const token = response.headers.authorization;
  dispatch({ type: AUTH_USER, payload: token });
};
