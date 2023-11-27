import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationButton = () => {
  const showToast = () => {
    toast.success('This is a success notification!', {
      position: 'bottom-right',
      autoClose: 2000, // Đóng sau 3 giây
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return <button onClick={showToast}>Show Notification</button>;
};

export default NotificationButton;
