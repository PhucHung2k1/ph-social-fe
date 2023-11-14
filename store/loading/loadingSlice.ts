import { createSlice } from '@reduxjs/toolkit';

type loadingSliceProps = {
  isLoading: boolean;
};
const initialState = {
  isLoading: false,
} as loadingSliceProps;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { showLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
