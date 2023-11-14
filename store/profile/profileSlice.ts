import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeleteData, EditData } from '../globalTypes';

interface ProfileState {
  loading: boolean;
  users: any[];
  userPosts: any[];
  ids: any[];
}

const initialState: ProfileState = {
  loading: false,
  users: [],
  userPosts: [],
  ids: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    getUser: (state, action: any) => {
      state.users = [
        ...state.users.filter((item) => item._id !== action.payload._id),
        action.payload,
      ];
    },
    followUser: (state, action) => {
      state.users = EditData(state.users, action.payload._id, action.payload);
    },
    unfollowUser: (state, action) => {
      state.users = EditData(state.users, action.payload._id, action.payload);
    },
    getIdProfile: (state, action) => {
      state.ids = [...state.ids, action.payload];
    },
    getPosts: (state, action) => {
      state.userPosts = [...state.userPosts, action.payload];
    },
  },
});

export const {
  setLoading,
  getUser,
  followUser,
  unfollowUser,
  getIdProfile,
  getPosts,
} = profileSlice.actions;
export default profileSlice.reducer;
