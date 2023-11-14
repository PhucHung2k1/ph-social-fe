import { deleteDataAPI, getDataAPI, postDataAPI } from '@/utils/fetchData';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { getNotifiesRedux } from './notifySlice';

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

    // dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies });
  } catch (err: any) {
    showToastMessage(dispatch, err.response.data.msg, 'error');
  }
};
