import { createSlice } from '@reduxjs/toolkit';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import banner4 from '../../assets/banner4.jpg';
import banner5 from '../../assets/banner5.jpg';

const bannerSlice = createSlice({
  name: 'banners',
  initialState: {
    list: [
      { id: 1, title: 'Summer Sale', imageUrl: banner1 },
      { id: 2, title: 'Winter Collection', imageUrl: banner2 },
      { id: 3, title: 'Black Friday Deals', imageUrl: banner3 },
      { id: 4, title: 'New Arrivals', imageUrl: banner4 },
      { id: 5, title: 'Holiday Discounts', imageUrl: banner5 },
    ],
    status: 'idle',
  },
  reducers: {
    shuffleBanners: (state) => {
      state.list = state.list.sort(() => Math.random() - 0.5);
    },
  },
});

export const { shuffleBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
