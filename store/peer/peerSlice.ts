import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnlineState {
  peer: any;
}

const initialState: OnlineState = {
  peer: null,
};

const peerSlice = createSlice({
  name: 'peer',
  initialState,
  reducers: {
    setPeerRedux: (state, action: PayloadAction<string>) => {
      state.peer = action.payload;
    },
  },
});

export const { setPeerRedux } = peerSlice.actions;

export default peerSlice.reducer;
