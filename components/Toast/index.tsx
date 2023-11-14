import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import type { AlertProps } from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { hideToast } from '@/store/toast/toastSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ToastContainer() {
  const dispatch = useAppDispatch();
  const propertiesToast = useAppSelector(
    (state) => state.toastSlice.propertiesToast
  );
  const typeAlert = useAppSelector((state) => state.toastSlice.typeAlert);
  const messageToast = useAppSelector((state) => state.toastSlice.messageToast);
  const isShowToast = useAppSelector((state) => state.toastSlice.isShowToast);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideToast());
  };

  return (
    <Snackbar
      anchorOrigin={
        propertiesToast.position || { vertical: 'top', horizontal: 'center' }
      }
      sx={{ zIndex: 9999 }}
      open={isShowToast}
      autoHideDuration={propertiesToast.autoHideDuration || 3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={typeAlert} sx={{ width: '100%' }}>
        {messageToast}
      </Alert>
    </Snackbar>
  );
}
