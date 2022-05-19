import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import offersReducer from './slices/offersSlice';
import roomReducer from './slices/roomSlice';


export const rootReducer = combineReducers({
  user: userReducer,
  offers: offersReducer,
  room: roomReducer,
});
