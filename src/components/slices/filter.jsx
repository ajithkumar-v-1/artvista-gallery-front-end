// store/artworkSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../API';

export const fetchArtworksByCategory = createAsyncThunk(
  'artworks/fetchByCategory',
  async (category) => {
    const response = await axios.get(`${API}/artwork/category/${category}`);
    return response.data;
  }
);

export const searchArtworks = createAsyncThunk(
  'artworks/search',
  async (query) => {
    const response = await axios.get(`${API}/artwork/search?q=${query}`);
    return response.data;
  }
);

const artworkSlice = createSlice({
  name: 'artworks',
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchArtworksByCategory.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchArtworksByCategory.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    [fetchArtworksByCategory.rejected]: (state) => {
      state.status = 'failed';
    },
    [searchArtworks.pending]: (state) => {
      state.status = 'loading';
    },
    [searchArtworks.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    [searchArtworks.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export default artworkSlice.reducer;
