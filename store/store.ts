import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import loadingSlice from './loading/loadingSlice';
import toastSlice from './toast/toastSlice';
import authSlice from './auth/authSlice';
import userSlice from './user/userSlice';
import profileSlice from './profile/profileSlice';
import homePost from './post/postSlice';
import discoverSlice from './discover/discoverSlice';
import savedPostsSlice from './savedPosts/savedPostsSlice';
import suggestionSlice from './suggestion/suggestionSlice';
import socketSlice from './socket/socketSlice';
import notifySlice from './notify/notifySlice';
import messageSlice from './message/messageSlice';
import onlineSlice from './online/onlineSlice';
import callSlice from './call/callSlice';
import peerSlice from './peer/peerSlice';
export const store = configureStore({
  reducer: {
    loadingSlice,
    toastSlice,
    authSlice,
    userSlice,
    profileSlice,
    homePost,
    discoverSlice,
    suggestionSlice,
    savedPostsSlice,
    socketSlice,
    notifySlice,
    messageSlice,
    onlineSlice,
    callSlice,
    peerSlice,
  },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
