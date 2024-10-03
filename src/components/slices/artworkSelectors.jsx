// src/redux/artworkSelectors.js
import { createSelector } from '@reduxjs/toolkit';

// Assuming your state shape is something like:
// state = {
//   artwork: {
//     artworks: [],
//     status: 'idle',
//     error: null,
//   },
//   // other slices...
// }

// Basic selectors
const selectArtworksState = (state) => state.artwork;

export const selectArtworks = createSelector(
  [selectArtworksState],
  (artworkState) => artworkState.artworks
);

export const selectArtworksStatus = createSelector(
  [selectArtworksState],
  (artworkState) => artworkState.status
);

export const selectArtworksError = createSelector(
  [selectArtworksState],
  (artworkState) => artworkState.error
);
