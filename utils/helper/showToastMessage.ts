import {
  setTypeAlertToast,
  setMessageToast,
  showToast,
} from '@/store/toast/toastSlice';

export const showToastMessage = (
  dispatch: (arg0: { payload: any; type: any }) => void,
  message: string,
  typeAlert: 'success' | 'error' | 'warning' | 'info'
) => {
  dispatch(setTypeAlertToast(typeAlert));
  dispatch(setMessageToast(message));
  dispatch(showToast());
};
