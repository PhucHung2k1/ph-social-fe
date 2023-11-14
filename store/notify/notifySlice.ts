import { createSlice } from '@reduxjs/toolkit';
interface notifySliceProps {
  loading: any;
  data: [];
  sound: any;
}

const initialState = {
  loading: false,
  data: [],
  sound: false,
} as notifySliceProps;

const notifySlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    getNotifiesRedux: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { getNotifiesRedux } = notifySlice.actions;
export default notifySlice.reducer;
