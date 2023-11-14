import { createSlice } from '@reduxjs/toolkit';
import { EditData } from '../globalTypes';

interface PostSliceProps {
  posts: Array<any>;
  result: Number;
  page: any;
  firstLoad: boolean;
}

const initialState = {
  posts: [],
  result: 9,
  page: 2,
  firstLoad: false,
} as PostSliceProps;

const discoverSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    getPostsDiscover: (state, action) => {
      state.posts = action.payload.posts;
      state.result = action.payload.result;
      state.firstLoad = true;
    },
    getPostsDiscoverMore: (state, action) => {
      state.posts = action.payload.posts;
      state.result = action.payload.result;
      state.page = state.page + 1;
    },
  },
});
export const { getPostsDiscover, getPostsDiscoverMore } = discoverSlice.actions;
export default discoverSlice.reducer;
