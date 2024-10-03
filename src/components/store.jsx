import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import artworkSlice from './slices/artworkSlice';
import bannerReducer from './slices/bannerSlice';
import ratingReducer from './slices/ratingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    artwork: artworkSlice,
    banners: bannerReducer,
    ratings: ratingReducer,
  },
});

export default store;
