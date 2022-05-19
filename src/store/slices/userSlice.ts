import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

type User = {
  authorizationStatus: AuthorizationStatus;
};

const initialState: User = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { requireAuthorization } = userSlice.actions;
export default userSlice.reducer;
