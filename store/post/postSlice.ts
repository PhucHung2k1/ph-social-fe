import { createSlice } from '@reduxjs/toolkit';
import { DeleteData, EditData } from '../globalTypes';

interface PostSliceProps {
  posts: Array<any>;
  result: Number;
  page: Number;
}

const initialState = {
  posts: [],
  result: 0,
  page: 2,
} as PostSliceProps;

const postSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    createPostRedux: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    getPostsRedux: (state, action) => {
      state.posts = action.payload.posts;
      state.result = action.payload.result;
    },
    updatePostRedux: (state, action) => {
      state.posts = EditData(state.posts, action.payload._id, action.payload);
    },
    deletePostRedux: (state, action) => {
      state.posts = DeleteData(state.posts, action.payload._id);
    },
    detailPost: (state, action) => {
      state.posts = DeleteData(state.posts, action.payload._id);
    },
  },
});
export const {
  createPostRedux,
  getPostsRedux,
  updatePostRedux,
  deletePostRedux,
} = postSlice.actions;
export default postSlice.reducer;
