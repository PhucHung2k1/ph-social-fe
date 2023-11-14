import { createSlice } from '@reduxjs/toolkit';

type commentSliceProps = {
  isLoading: boolean;
};
const initialState = {
  isLoading: false,
} as commentSliceProps;

const commentSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { showLoading } = commentSlice.actions;
export default commentSlice.reducer;
