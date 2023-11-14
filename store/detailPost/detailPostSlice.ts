import { createSlice } from '@reduxjs/toolkit';
import { DeleteData, EditData } from '../globalTypes';

interface detailPostSliceProps {
  posts: Array<any>;
}

const initialState = {
  posts: [],
} as detailPostSliceProps;

const detailPostSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    getPostDetailRedux: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
  },
});
export const { getPostDetailRedux } = detailPostSlice.actions;
export default detailPostSlice.reducer;
