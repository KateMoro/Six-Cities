import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from './../../types/offer';
import { CommentType } from './../../types/comment';

type Room = {
  offer: OfferType | null,
  comments: CommentType[],
  nearbyOffers: OfferType[],
};

const initialState: Room = {
  offer: null,
  comments: [],
  nearbyOffers: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    loadOffer: (state, action) => {
      state.offer = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    toggleOfferFavorite: (state) => {
      if (state.offer !== null) {
        state.offer.isFavorite = !state.offer.isFavorite;
      }
    },
    toggleNearbyOffersFavorite: (state, action) => {
      const nearbyOffersIndex = state.nearbyOffers.findIndex((nearbyOffer) => nearbyOffer.id === action.payload.id);
      state.nearbyOffers = [
        ...state.nearbyOffers.slice(0, nearbyOffersIndex),
        action.payload,
        ...state.nearbyOffers.slice(nearbyOffersIndex + 1),
      ];
    },
  },
});

export const {
  loadOffer,
  loadComments,
  loadNearbyOffers,
  toggleOfferFavorite,
  toggleNearbyOffersFavorite,
} = roomSlice.actions;

export default roomSlice.reducer;
