import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(item => item._id === action.payload._id);
      if (!item) {
        state.push({ ...action.payload, quantity: 1 });
      } else {
        item.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const newState = state.filter(item => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
    updateQuantity: (state, action) => {
      const item = state.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      localStorage.removeItem('cart');
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;