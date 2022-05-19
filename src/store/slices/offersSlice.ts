import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types/offer';

type Offers = {
  city: string,
  offers: OfferType[],
  favoriteOffers: OfferType[],
  isDataLoaded: boolean,
};

const initialState: Offers = {
  city: 'Paris',
  offers: [],
  favoriteOffers: [],
  isDataLoaded: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadFavoriteOffers: (state, action) => {
      state.favoriteOffers = action.payload;
    },
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    toggleFavorite: (state, action) => {
      const idx = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers = [
        ...state.offers.slice(0, idx),
        action.payload,
        ...state.offers.slice(idx + 1),
      ];
    },
  },
});

export const {
  loadOffers,
  loadFavoriteOffers,
  changeCity,
  toggleFavorite,
} = offersSlice.actions;

export default offersSlice.reducer;
