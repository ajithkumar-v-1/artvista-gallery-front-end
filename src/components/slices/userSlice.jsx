import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  userId: null,
  role: null, // e.g., 'user' or 'artist'
};

// Create slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUserId, setRole } = userSlice.actions;
export default userSlice.reducer;
