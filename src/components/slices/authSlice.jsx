// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
  username: localStorage.getItem('username') || null,
  role: localStorage.getItem('role') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, userId, username, role } = action.payload;
      state.token = token;
      state.userId = userId;
      state.username = username;
      state.role = role;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
    },
    
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.username = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('cart');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
