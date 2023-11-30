import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService, IRegister } from '@/services/auth.service';

import { UpdateProfileProps, UserService } from '@/services/user.service';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { imageUpload } from '@/utils/imageUpload';
import { setIsChange } from './userSlice';
import { showLoading } from '../loading/loadingSlice';
import { getUser } from '../profile/profileSlice';
import { setAuth } from '../auth/authSlice';
import { getDataAPI, postDataAPI } from '@/utils/fetchData';

export const searchUser = createAsyncThunk(
  'user/searchUser',
  async (body: IRegister, { dispatch }) => {
    const servicesAccountAPI = new AuthService();

    try {
      const { data, status, error } = await servicesAccountAPI.register(body);

      if (status === 200) {
        showToastMessage(dispatch, data?.msg, 'success');
        return { data, status };
      }

      if (error) {
        showToastMessage(dispatch, error?.data?.msg, 'error');
        return error;
      }
    } catch (err: any) {}
  }
);
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (body: any, { dispatch }) => {
    const userService = new UserService();

    try {
      const { data, status, error } = await userService.getUserById(body.id);

      if (status === 200) {
        // dispatch(setAuth(data?.user));
        if (body.users.every((user: any) => user._id !== body.id)) {
          dispatch(getUser(data?.user));

          return { data, status };
        }

        return { data, status };
      }

      if (error) {
        showToastMessage(dispatch, error?.data?.msg, 'error');

        return error;
      }
    } catch (err: any) {}
  }
);
export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (body: any, { dispatch }) => {
    const media = await imageUpload([body.avatar]);

    const userService = new UserService();
    const bodyNew = {
      id: body.id,
      avatar: media[0]?.url,
    };

    try {
      const { data, status, error } = await userService.updateAvatar(bodyNew);

      if (status === 200) {
        dispatch(setIsChange());

        return { data, status };
      }

      if (error) {
        showToastMessage(dispatch, error?.data?.msg, 'error');
        return error;
      }
    } catch (err: any) {}
  }
);
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (body: UpdateProfileProps, { dispatch }) => {
    const userService = new UserService();

    try {
      dispatch(showLoading(true));
      const { data, status, error } = await userService.updateProfile(body);

      if (status === 200) {
        dispatch(setIsChange());
        dispatch(showLoading(false));

        return { data, status };
      }

      if (error) {
        showToastMessage(dispatch, error?.data?.msg, 'error');
        return error;
      }
      dispatch(showLoading(false));
    } catch (err: any) {}
  }
);
export const updateStory = createAsyncThunk(
  'user/updateStory',
  async (body: any, { dispatch }) => {
    const userService = new UserService();

    try {
      dispatch(showLoading(true));
      const { data, status, error } = await userService.updateStory(body);

      if (status === 200) {
        dispatch(setIsChange());
        dispatch(showLoading(false));

        return { data, status };
      }

      if (error) {
        showToastMessage(dispatch, error?.data?.msg, 'error');
        return error;
      }
      dispatch(showLoading(false));
    } catch (err: any) {}
  }
);

export const logout = () => async (dispatch: any) => {
  try {
    localStorage.removeItem('firstLogin');

    await postDataAPI('logout');
  } catch (err) {
    // dispatch({
    //   type: GLOBALTYPES.ALERT,
    //   payload: {
    //     error: err.response.data.msg,
    //   },
    // });
  }
};

export const updateCoverImage = createAsyncThunk(
  'user/updateCoverImage',
  async (body: any, { dispatch }) => {
    const media = await imageUpload([body.coverImage]);

    const userService = new UserService();
    const bodyNew = {
      id: body.id,
      coverImage: media[0]?.url,
    };

    try {
      const { data, status, error } = await userService.updateCoverImage(
        bodyNew
      );

      if (status === 200) {
        dispatch(setIsChange());

        return { data, status };
      }

      if (error) {
        showToastMessage(dispatch, error?.data?.msg, 'error');
        return error;
      }
    } catch (err: any) {}
  }
);
export const updateVipUserHandle =
  ({ auth }: any) =>
  async (dispatch: any) => {
    try {
      const res = await getDataAPI(
        `updateVipUser/${auth?.user?._id}`,
        auth.token
      );

      dispatch(setIsChange());
      dispatch(setAuth({ ...auth, user: res?.data?.updatedUser }));
      return res;
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
