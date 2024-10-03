import axios from 'axios';
import { API } from '../API';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginUser = (email, password) => async dispatch => {
  try {
    const response = await axios.post(`${API}/auth/login`, { email, password });
    const { token, role } = response.data;

    // Save token to localStorage
    localStorage.setItem('x-auth-token', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, role },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error (e.g., dispatch error action)
  }
};

export const logoutUser = () => {
  localStorage.removeItem('x-auth-token');
  return {
    type: LOGOUT,
  };
};
