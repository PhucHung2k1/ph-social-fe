import { postDataAPI } from '@/utils/fetchData';
import { Dispatch } from 'redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AuthService,
  IRegister,
  IResetPassword,
} from '@/services/auth.service';
import { IRegisterLoginSocal, ISignInForm } from '@/services/auth.interface';

import { showLoading } from '../loading/loadingSlice';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { setAuth } from './authSlice';
import Cookies from 'js-cookie';

interface LoginData {
  email: string;
  password: string;
}

export const login = (data: any) => async (dispatch: any) => {
  try {
    const res: any = await postDataAPI('login', data);

    const firstLogin = true;
    localStorage.setItem('firstLogin', JSON.stringify(firstLogin));

    if (res?.status === 200) {
      showToastMessage(dispatch, res?.data?.msg, 'success');
      dispatch(
        setAuth({
          token: res.data.access_token,
          user: res?.data?.user,
          refreshToken: res?.data?.refresh_token,
        })
      );
      Cookies.set('refreshtoken', res?.data?.refresh_token, { expires: 30 });
    }
  } catch (err: any) {
    if (err) {
      showToastMessage(dispatch, err?.response?.data?.msg, 'error');
    }
    return err;
  }
};
export const refreshToken = (body: any) => async (dispatch: any) => {
  const firstLogin = localStorage.getItem('firstLogin');
  if (firstLogin) {
    try {
      const res = await postDataAPI('refresh_token_test', { rf_token: body });
      dispatch(
        setAuth({
          token: res.data.access_token,
          user: res?.data?.user,
        })
      );
    } catch (err: any) {
      if (err) {
        showToastMessage(dispatch, err?.response?.data?.msg, 'error');
      }
      return err;
    }
  }
};

export const checkExistEmail = createAsyncThunk(
  'auth/checkExistEmail',
  async (body: any) => {
    const servicesAccountAPI = new AuthService();

    try {
      const { data, status, error } = await servicesAccountAPI.checkExistEmail(
        body
      );

      if (status === 200 && data) {
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {}
  }
);
export const registerLoginSocial = createAsyncThunk(
  'auth/registerLoginSocial',
  async (body: IRegisterLoginSocal, { dispatch }) => {
    const servicesAccountAPI = new AuthService();

    try {
      const { data, status, error } =
        await servicesAccountAPI.registerLoginSocial(body);

      if (status === 200 && data) {
        const firstLogin = true;
        localStorage.setItem('firstLogin', JSON.stringify(firstLogin));
        Cookies.set('refreshtoken', data?.refresh_token, { expires: 30 });

        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {}
  }
);
export const checkExistEmailForgotPassword = createAsyncThunk(
  'auth/checkExistEmailForgotPassword',
  async (body: any) => {
    const servicesAccountAPI = new AuthService();

    try {
      const { data, status, error } =
        await servicesAccountAPI.checkExistEmailForgotPassword(body);

      if (status === 200 && data) {
        return data;
      }

      throw new Error(error ? error?.data?.msg : 'Failed.');
    } catch (err: any) {}
  }
);
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (body: any, { dispatch }) => {
    const servicesAccountAPI = new AuthService();

    try {
      const { data, status, error } = await servicesAccountAPI.forgotPassword(
        body
      );

      if (status === 200 && data) {
        return data;
      }

      throw new Error(error ? error?.data?.msg : 'Failed.');
    } catch (err: any) {}
  }
);
export const checkToken = createAsyncThunk(
  'auth/checkToken',
  async (body: any, { dispatch }) => {
    const servicesAccountAPI = new AuthService();

    try {
      const { data, status, error } = await servicesAccountAPI.checkToken(body);

      if (status === 200) {
      } else {
        showToastMessage(dispatch, error?.data?.msg, 'error');
        throw new Error(error ? error : 'Failed.');
      }
    } catch (err: any) {
      throw new Error(err ? err?.data?.msg : 'Failed.');
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (_body: IResetPassword, { dispatch }) => {
    const servicesAccountAPI = new AuthService();

    try {
      const { data, status, error } = await servicesAccountAPI.resetPassword(
        _body.token,
        _body.newPassword
      );

      if (status === 200) {
        showToastMessage(dispatch, data?.msg, 'success');
      } else {
        showToastMessage(dispatch, error?.data?.msg, 'error');
        throw new Error(error ? error : 'Failed.');
      }
    } catch (err: any) {
      throw new Error(err ? err?.data?.msg : 'Failed.');
    }
  }
);
export const registerAPI = createAsyncThunk(
  'auth/register',
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
