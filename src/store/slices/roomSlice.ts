import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from './../../types/offer';
import { CommentType } from './../../types/comment';

type Room = {
  offer: OfferType | null,
  comments: CommentType[],
};

const initialState: Room = {
  offer: null,
  comments: [],
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
    toggleRoomFavoriteAction: (state) => {
      if (state.offer !== null) {
        state.offer.isFavorite = !state.offer.isFavorite;
      }
    },
  },
});

export const {
  loadOffer,
  loadComments,
  toggleRoomFavoriteAction,
} = roomSlice.actions;

export default roomSlice.reducer;
