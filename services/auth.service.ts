import { IResponse } from '@/utils/aixios/entities';
import { catchAxiosError } from '@/utils/aixios/error';
import { apiGet, apiPost } from '@/utils/aixios/instance';
import { IRegisterLoginSocal, ISignInForm } from './auth.interface';

const LOGIN = '/api/login';
const REGISTER = '/api/register';
const REFRESH_TOKEN = '/api/refresh_token';
const CHECK_EXIST_EMAIL = '/api/check_email';
const REGISTER_SOCIAL = '/api/register_social';
const CHECK_EXIST_EMAIL_FORGOT_PASSWORD = '/api/check_email_forgot_password';
const FORGOT_PASSWORD = '/api/forgot_password';
const CHECK_TOKEN = '/api/check_token';
const RESET_PASSWORD = '/api/reset_password';

export interface IResetPassword {
  token: string | any;
  newPassword: string;
}
export interface IRegister {
  fullname: string;
  username: string;
  email: string | number;
  password: string;
}
export class AuthService {
  public login = async (data: ISignInForm): Promise<IResponse> => {
    const response: IResponse = await apiPost(LOGIN, data).catch(
      catchAxiosError
    );
    return response;
  };
  public register = async (data: IRegister): Promise<IResponse> => {
    const response: IResponse = await apiPost(REGISTER, data).catch(
      catchAxiosError
    );
    return response;
  };
  public refreshToken = async (data: string): Promise<IResponse> => {
    const response: IResponse = await apiPost(REFRESH_TOKEN, data).catch(
      catchAxiosError
    );
    return response;
  };
  public checkExistEmail = async (data: string): Promise<IResponse> => {
    const response: IResponse = await apiPost(CHECK_EXIST_EMAIL, data).catch(
      catchAxiosError
    );
    return response;
  };
  public registerLoginSocial = async (
    data: IRegisterLoginSocal
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(REGISTER_SOCIAL, data).catch(
      catchAxiosError
    );
    return response;
  };
  public checkExistEmailForgotPassword = async (
    data: string
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(
      CHECK_EXIST_EMAIL_FORGOT_PASSWORD,
      data
    ).catch(catchAxiosError);
    return response;
  };
  public forgotPassword = async (data: string): Promise<IResponse> => {
    const response: IResponse = await apiPost(FORGOT_PASSWORD, data).catch(
      catchAxiosError
    );
    return response;
  };
  public checkToken = async (data: string): Promise<IResponse> => {
    const response: IResponse = await apiPost(CHECK_TOKEN, data).catch(
      catchAxiosError
    );
    return response;
  };
  public resetPassword = async (
    token: string,
    newPassword: string
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(
      `${RESET_PASSWORD}?token=${token}`,
      {
        newPassword: newPassword,
      }
    ).catch(catchAxiosError);
    return response;
  };
}
