import { createSlice } from '@reduxjs/toolkit';
export interface Auth {
  user: User;
  token: string;
  refreshToken: string;
}
export interface User {
  address: string;
  avatar: string;
  coverImage: string;
  createdAt: string;
  email: string;
  followers: any[];
  following: any[];
  fullname: string;
  gender: string;
  mobile: string;
  password: string;
  role: string;
  saved: any[];
  story: string;
  updatedAt: string;
  username: string;
  website: string;
  __v: number;
  _id: string;
}
type loadingSliceProps = {
  rememberPass: boolean;
  auth: Auth;
};
const initialState = {
  rememberPass: false,
  auth: {},
} as loadingSliceProps;

const authSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setRememberPass: (state, action) => {
      state.rememberPass = action.payload;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});
export const { setRememberPass, setAuth } = authSlice.actions;
export default authSlice.reducer;
