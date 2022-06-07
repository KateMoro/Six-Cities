import { createSlice } from '@reduxjs/toolkit';
import { CommentType } from '../../types/comment';

type Comments = {
  comments: CommentType[],
};

const initialState: Comments = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    loadComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { loadComments } = commentsSlice.actions;

export default commentsSlice.reducer;
