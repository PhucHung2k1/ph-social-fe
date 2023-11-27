import { createSlice } from '@reduxjs/toolkit';

type callSliceProps = {
  call: any;
};
const initialState = {
  call: null,
} as callSliceProps;

const callSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    callRedux: (state, action) => {
      state.call = action.payload;
    },
  },
});
export const { callRedux } = callSlice.actions;
export default callSlice.reducer;
