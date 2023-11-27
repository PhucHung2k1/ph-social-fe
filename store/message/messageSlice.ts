import { createSlice } from '@reduxjs/toolkit';
import { DeleteData, EditData } from '../globalTypes';
interface messageSliceProps {
  users: any;
  resultUsers: any;
  data: any;
  resultData: any;
  firstLoad: boolean;
}

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  resultData: 0,
  firstLoad: false,
} as messageSliceProps;

const messageSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    messageAddUserRedux: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    addMessageRedux: (state, action) => {
      state.data = [...state.data, action.payload];
      state.users = state.users.map((user: any) =>
        user._id === action.payload.recipient ||
        user._id === action.payload.sender
          ? {
              ...user,
              text: action.payload.text,
              media: action.payload.media,
              call: action.payload.call,
            }
          : user
      );
    },
    getConversationRedux: (state, action) => {
      state.users = action.payload.newArr;
      state.resultUsers = action.payload.result;
      state.firstLoad = true;
    },
    getMessageRedux: (state, action) => {
      state.data = action.payload.messages;
      state.resultData = action.payload.result;
    },
    updateMessageRedux: (state, action) => {
      state.data = EditData(state.data, action.payload._id, action.payload);
    },
    deleteMessagesRedux: (state, action) => {
      state.data = action.payload.newData;
    },
    deleteConversationRedux: (state, action) => {
      state.data = DeleteData(state.data, action.payload);
      state.users = DeleteData(state.users, action.payload);
    },
    checkOnlineOfflineRedux: (state, action) => {
      state.users = state.users.map((user: any) =>
        action.payload.includes(user._id)
          ? { ...user, online: true }
          : { ...user, online: false }
      );
    },
  },
});
export const {
  messageAddUserRedux,
  addMessageRedux,
  getConversationRedux,
  getMessageRedux,
  updateMessageRedux,
  deleteMessagesRedux,
  deleteConversationRedux,
  checkOnlineOfflineRedux,
} = messageSlice.actions;
export default messageSlice.reducer;
