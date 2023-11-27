import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from '@/utils/fetchData';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import {
  deleteAllNotifiesRedux,
  getNotifiesRedux,
  updateNotifyRedux,
} from './notifySlice';

export const createNotify =
  ({ msg, auth, socket }: any) =>
  async (dispatch: any) => {
    try {
      const res = await postDataAPI('notify', msg, auth.token);

      socket.emit('createNotify', {
        ...res.data.notify,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const removeNotify =
  ({ msg, auth, socket }: any) =>
  async (dispatch: any) => {
    try {
      await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);

      socket.emit('removeNotify', msg);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const getNotifies = (token: any) => async (dispatch: any) => {
  try {
    const res = await getDataAPI('notifies', token);
    dispatch(getNotifiesRedux(res.data.notifies));
  } catch (err: any) {
    showToastMessage(dispatch, err.response.data.msg, 'error');
  }
};
export const isReadNotify =
  ({ msg, auth }: any) =>
  async (dispatch: any) => {
    try {
      // const res = await getDataAPI('notifies', token);
      await patchDataAPI(`isReadNotify/${msg._id}`, null, auth.token);
      dispatch(updateNotifyRedux({ ...msg, isRead: true }));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const deleteAllNotifies =
  ({ auth }: any) =>
  async (dispatch: any) => {
    try {
      dispatch(deleteAllNotifiesRedux([]));
      await deleteDataAPI(`deleteAllNotify`, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
