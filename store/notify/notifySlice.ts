import { createSlice } from '@reduxjs/toolkit';
import { EditData } from '../globalTypes';
interface notifySliceProps {
  loading: any;
  data: any;
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
    createNotifyRedux: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    removeNotifyRedux: (state, action) => {
      state.data = state.data.filter(
        (item: any) =>
          item.id !== action.payload.id || item.url !== action.payload.url
      );
    },
    updateNotifyRedux: (state, action) => {
      state.data = EditData(state.data, action.payload._id, action.payload);
    },
    updateSoundRedux: (state, action) => {
      state.sound = action.payload;
    },
    deleteAllNotifiesRedux: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const {
  getNotifiesRedux,
  createNotifyRedux,
  removeNotifyRedux,
  updateNotifyRedux,
  updateSoundRedux,
  deleteAllNotifiesRedux,
} = notifySlice.actions;
export default notifySlice.reducer;
