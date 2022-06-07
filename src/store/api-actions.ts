import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';
import { AppDispatch, State } from './../types/state';
import { OfferType } from '../types/offer';
import { UserData } from './../types/user-data';
import { CommentType, AddCommentData } from './../types/comment';
import { errorHandle } from './../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { dropUserEmail, saveUserEmail } from '../services/user-email';
import { requireAuthorization } from './slices/userSlice';
import { loadComments } from './slices/commentsSlice';
import {
  loadOffers,
  loadFavoriteOffers,
  toggleFavorite,
  loadRoomOffer,
  loadRoomNearbyOffers
} from './slices/offersSlice';

type AuthData = {
  login: string;
  password: string;
};

type FavStatusData = {
  id: number;
  isFavorite: boolean;
}

export const fetchOffersAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferType[]>(APIRoute.Hotels);
      dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
      dispatch(loadFavoriteOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const toggleFavoriteAction = createAsyncThunk<void, FavStatusData, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'data/toggleFavorite',
  async ({ id, isFavorite }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<OfferType>(`${APIRoute.Favorite}/${id}/${isFavorite ? 0 : 1}`);
      dispatch(toggleFavorite(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchRoomOfferAction = createAsyncThunk<void, number, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'data/fetchRoomOffer',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferType>(`${APIRoute.Hotels}/${id}`);
      dispatch(loadRoomOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'room/fetchComments',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<CommentType[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNearbyPlacesAction = createAsyncThunk<void, number, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'data/fetchNearbyPlaces',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferType[]>(`${APIRoute.Hotels}/${id}/nearby`);
      dispatch(loadRoomNearbyOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addCommentAction = createAsyncThunk<void, AddCommentData, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'room/addComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<CommentType[]>(`${APIRoute.Comments}/${id}`, { comment, rating });
      dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      saveUserEmail(data.email);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: State, extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dropUserEmail();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);
