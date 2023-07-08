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
    showLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith('/pending');
        },
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});
export const { showLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
