import { createSlice } from '@reduxjs/toolkit';
interface socketSliceProps {
  socket: any;
}

const initialState = {
  socket: [],
} as socketSliceProps;

const socketSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    getSocketRedux: (state, action) => {
      state.socket = action.payload;
    },
  },
});
export const { getSocketRedux } = socketSlice.actions;
export default socketSlice.reducer;
