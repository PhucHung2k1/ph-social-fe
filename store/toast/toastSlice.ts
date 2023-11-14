import { createSlice } from '@reduxjs/toolkit';

export type IToastState = {
  isShowToast: boolean;
  messageToast: string;
  propertiesToast: {
    autoHideDuration: number;
    position: {
      vertical: 'top' | 'bottom';
      horizontal: 'left' | 'center' | 'right';
    };
  };
  typeAlert: 'success' | 'error' | 'warning' | 'info';
};
const initialState = {
  isShowToast: false,
  messageToast: '',
  propertiesToast: {
    autoHideDuration: 1000,
    position: {
      vertical: 'top',
      horizontal: 'center',
    },
  },
  typeAlert: 'success',
} as IToastState;

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state) => {
      state.isShowToast = true;
    },
    hideToast: (state) => {
      state.isShowToast = false;
    },
    setMessageToast: (state, action) => {
      state.messageToast = action.payload;
    },
    setPropertiesToast: (state, action) => {
      state.propertiesToast = action.payload;
    },
    setTypeAlertToast: (state, action) => {
      state.typeAlert = action.payload;
    },
  },
});

export const {
  showToast,
  hideToast,
  setMessageToast,
  setPropertiesToast,
  setTypeAlertToast,
} = toastSlice.actions;
export default toastSlice.reducer;
