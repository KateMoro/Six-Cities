import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types/offer';

type Offers = {
  city: string,
  selectedOfferId: number,
  offers: OfferType[],
  favoriteOffers: OfferType[],
  isDataLoaded: boolean,
  sortType: string,
  roomOffer: OfferType | null,
  roomNearbyOffers: OfferType[],
};

const initialState: Offers = {
  city: 'Paris',
  selectedOfferId: 0,
  offers: [],
  favoriteOffers: [],
  isDataLoaded: false,
  sortType: 'Popular',
  roomOffer: null,
  roomNearbyOffers: [],
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
      const id = action.payload.id;

      if (state.roomOffer !== null && state.roomOffer.id === id) {
        state.roomOffer.isFavorite = !state.roomOffer.isFavorite;
      }

      const offersIndex = state.offers.findIndex((offer) => offer.id === id);
      state.offers.splice(offersIndex, 1, action.payload);

      const favoriteOffersIndex = state.favoriteOffers.findIndex((offer) => offer.id === id);
      if (favoriteOffersIndex > -1) {
        state.favoriteOffers.splice(favoriteOffersIndex, 1);
      }

      const nearbyOffersIndex = state.roomNearbyOffers.findIndex((nearbyOffer) => nearbyOffer.id === id);
      if (nearbyOffersIndex > -1) {
        state.roomNearbyOffers.splice(nearbyOffersIndex, 1, action.payload);
      }
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    loadRoomOffer: (state, action) => {
      state.roomOffer = action.payload;
    },
    loadRoomNearbyOffers: (state, action) => {
      state.roomNearbyOffers = action.payload;
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
  loadRoomOffer,
  loadRoomNearbyOffers,
} = offersSlice.actions;

export default offersSlice.reducer;
