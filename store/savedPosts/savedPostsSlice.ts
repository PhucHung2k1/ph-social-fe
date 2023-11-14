import { createSlice } from '@reduxjs/toolkit';

interface PostSliceProps {
  posts: Array<any>;
  result: Number;
}

const initialState = {
  posts: [],
  result: 9,
} as PostSliceProps;

const savedPostsSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    getPostsSaved: (state, action) => {
      state.posts = action.payload.savePosts;
      state.result = action.payload.result;
    },
  },
});
export const { getPostsSaved } = savedPostsSlice.actions;
export default savedPostsSlice.reducer;
