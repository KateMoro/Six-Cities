import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types/offer';

type Offers = {
  city: string,
  selectedOfferId: number,
  offers: OfferType[],
  favoriteOffers: OfferType[],
  isDataLoaded: boolean,
  sortType: string,
};

const initialState: Offers = {
  city: 'Paris',
  selectedOfferId: 0,
  offers: [],
  favoriteOffers: [],
  isDataLoaded: false,
  sortType: 'Popular',
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
    changeSelectedOfferId: (state, action) => {
      state.selectedOfferId = action.payload;
    },
    toggleFavorite: (state, action) => {
      const offersIndex = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers = [
        ...state.offers.slice(0, offersIndex),
        action.payload,
        ...state.offers.slice(offersIndex + 1),
      ];

      const favoriteOffersIndex = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);
      if (favoriteOffersIndex > -1) {
        state.favoriteOffers.splice(favoriteOffersIndex, 1);
      }
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const {
  loadOffers,
  loadFavoriteOffers,
  changeCity,
  changeSelectedOfferId,
  toggleFavorite,
  changeSortType,
} = offersSlice.actions;

export default offersSlice.reducer;
