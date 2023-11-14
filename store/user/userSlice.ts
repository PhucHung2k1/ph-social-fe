import { createSlice } from '@reduxjs/toolkit';
interface User {
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
  userData: User;
  isChange: boolean;
};
const initialState = {
  rememberPass: false,
  userData: {},
  isChange: false,
} as loadingSliceProps;

const userSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setRememberPass: (state, action) => {
      state.rememberPass = action.payload;
    },

    setIsChange: (state) => {
      state.isChange = !state.isChange;
    },
  },
});
export const { setRememberPass, setIsChange } = userSlice.actions;
export default userSlice.reducer;
