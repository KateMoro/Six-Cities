import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import offersReducer from './slices/offersSlice';
import commentsReducer from './slices/commentsSlice';


export const rootReducer = combineReducers({
  user: userReducer,
  offers: offersReducer,
  comments: commentsReducer,
});
