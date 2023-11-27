import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from '@/utils/fetchData';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import {
  addMessageRedux,
  deleteConversationRedux,
  deleteMessagesRedux,
  getConversationRedux,
  getMessageRedux,
  messageAddUserRedux,
} from './messageSlice';
import { DeleteData } from '../globalTypes';

export const addUser =
  ({ user, message }: any) =>
  async (dispatch: any) => {
    try {
      if (message.users.every((item: any) => item._id !== user._id)) {
        dispatch(messageAddUserRedux({ ...user, text: '', media: [] }));
      }
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const addMessage =
  ({ msg, auth, socket }: any) =>
  async (dispatch: any) => {
    const { _id, avatar, fullname, username } = auth.user;
    dispatch(addMessageRedux(msg));
    socket.emit('addMessage', {
      ...msg,
      user: { _id, avatar, fullname, username },
    });
    try {
      await postDataAPI('message', msg, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const getConversations =
  ({ auth, page = 1 }: any) =>
  async (dispatch: any) => {
    try {
      const res = await getDataAPI(
        `conversations?limit=${page * 9}`,
        auth.token
      );

      let newArr: any = [];
      res.data.conversations.forEach((item: any) => {
        item.recipients.forEach((cv: any) => {
          if (cv._id !== auth.user._id) {
            newArr.push({ ...cv, text: item.text, media: item.media });
          }
        });
      });

      dispatch(getConversationRedux({ newArr, result: res.data.result }));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const getMessage =
  ({ auth, id, page = 1 }: any) =>
  async (dispatch: any) => {
    try {
      const res = await getDataAPI(`message/${id}`, auth.token);
      const newData = { ...res.data, messages: res.data.messages.reverse() };

      dispatch(getMessageRedux({ ...newData, _id: id, page }));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const deleteMessages =
  ({ msg, data, auth }: any) =>
  async (dispatch: any) => {
    const newData = DeleteData(data, msg._id);
    dispatch(deleteMessagesRedux({ newData, _id: msg.recipient }));
    try {
      await deleteDataAPI(`message/${msg._id}`, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const deleteConversation =
  ({ auth, id }: any) =>
  async (dispatch: any) => {
    // const newData = DeleteData(data, msg._id);
    dispatch(deleteConversationRedux(id));
    try {
      await deleteDataAPI(`conversation/${id}`, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
