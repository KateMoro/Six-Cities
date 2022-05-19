import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from './../../types/offer';

type Room = {
  offer: OfferType | null,
  isDataLoaded: boolean,
};

const initialState: Room = {
  offer: null,
  isDataLoaded: false,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    loadOffer: (state, action) => {
      state.offer = action.payload;
      state.isDataLoaded = true;
    },
    toggleFavAction: (state) => {
      if (state.offer !== null) {
        state.offer.isFavorite = !state.offer.isFavorite;
      }
    },
  },
});

export const {
  loadOffer,
  toggleFavAction,
} = roomSlice.actions;

export default roomSlice.reducer;
