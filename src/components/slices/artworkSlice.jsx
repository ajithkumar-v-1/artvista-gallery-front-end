// redux/artworkSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../API';

const initialState = {
  artworks: [],
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
};

// Thunks
export const fetchArtworks = createAsyncThunk(
  'artworks/fetchArtworks',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/artwork/my-artworks`, {
        headers: {
          'x-auth-token': `Bearer ${token}`, // Pass token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


export const addArtwork = createAsyncThunk('artworks/addArtwork', async ({ newArtwork }, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.post(`${API}/artwork/add`, newArtwork, {
    headers: { 'x-auth-token': `Bearer ${token}` }
  });
  return response.data.artwork;
});

export const updateArtwork = createAsyncThunk('artworks/updateArtwork', async ({ artworkId, updatedArtwork }, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.put(`${API}/artwork/${artworkId}`, updatedArtwork, {
    headers: { 'x-auth-token': `Bearer ${token}` }
  });
  return response.data;
});

export const deleteArtwork = createAsyncThunk('artworks/deleteArtwork', async ({ artworkId }, { getState }) => {
  const token = getState().auth.token;
  await axios.delete(`${API}/artwork/${artworkId}`, {
    headers: { 'x-auth-token': `Bearer ${token}` }
  });
  return artworkId;
});

const artworkSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.artworks = action.payload;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addArtwork.fulfilled, (state, action) => {
        state.artworks.push(action.payload);
      })
      .addCase(updateArtwork.fulfilled, (state, action) => {
        const index = state.artworks.findIndex(artwork => artwork._id === action.payload._id);
        if (index !== -1) {
          state.artworks[index] = action.payload;
        }
      })
      .addCase(deleteArtwork.fulfilled, (state, action) => {
        state.artworks = state.artworks.filter(artwork => artwork._id !== action.payload);
      });
  },
});

export default artworkSlice.reducer;
