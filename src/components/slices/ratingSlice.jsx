import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../API'; // Adjust the import path as needed

// Thunk to fetch ratings for artworks
export const fetchRatings = createAsyncThunk('ratings/fetchRatings', async () => {
  const response = await axios.get(`${API}/artwork/ratings`); // Adjust this endpoint according to your backend
  return response.data;
});

// Thunk to update a rating
export const updateRating = createAsyncThunk('ratings/updateRating', async ({ artworkId, rating }, { getState }) => {
  const token = getState().auth.token; // Assuming you have an auth slice managing authentication
  const response = await axios.post(
    `${API}/artwork/${artworkId}/rate`,
    { rating },
    {
      headers: {
        'x-auth-token': `Bearer ${token}`
      }
    }
  );
  return { artworkId, rating: response.data.artwork.averageRating };
});

const ratingSlice = createSlice({
  name: 'ratings',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const { artworkId, rating } = action.payload;
        const artwork = state.find((art) => art._id === artworkId);
        if (artwork) {
          artwork.rating = rating;
        } else {
          state.push({ _id: artworkId, rating });
        }
      });
  },
});

export default ratingSlice.reducer;
