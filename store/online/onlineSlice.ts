import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnlineState {
  users: string[];
}

const initialState: OnlineState = {
  users: [],
};

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    setOnline: (state, action: PayloadAction<string>) => {
      state.users = [...state.users, action.payload];
    },
    setOffline: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((item) => item !== action.payload);
    },
  },
});

export const { setOnline, setOffline } = onlineSlice.actions;

export default onlineSlice.reducer;
