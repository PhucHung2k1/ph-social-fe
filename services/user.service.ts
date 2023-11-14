import { IResponse } from '@/utils/aixios/entities';
import { catchAxiosError } from '@/utils/aixios/error';
import { apiGet, apiPatch, apiPost } from '@/utils/aixios/instance';
import { IRegisterLoginSocal, ISignInForm } from './auth.interface';

const SEARCH_USER = '/api';
const GET_USER_BY_ID = '/api/getUserById';
const UPDATE_AVATAR = '/api/updateAvatar';
const UPDATE_COVER = '/api/updateCoverImage';
const UPDATE_PROFILE = '/api/updateProfile';
const UPDATE_STORY = '/api/updateStory';
const SUGGESTION_USER = '/api/suggestionUser';
const FOLLOW = '/api/';
const UN_FOLLOW = '/api/';
export interface ISearchUser {
  username: string | any;
  token: string;
}
export interface UpdateProfileProps {
  id: number | string;
  fullname: string;
  mobilephone: string;
  address: string | number;
  website?: string;
  story?: string;
  sex?: string;
}
export interface IRegister {
  fullname: string;
  username: string;
  email: string | number;
  password: string;
}
export class UserService {
  public login = async (data: ISearchUser): Promise<IResponse> => {
    const response: IResponse = await apiGet(
      `${SEARCH_USER}?username=${data.username}`,
      data
    ).catch(catchAxiosError);
    return response;
  };
  public getUserById = async (id: any): Promise<IResponse> => {
    const response: IResponse = await apiGet(`${GET_USER_BY_ID}/${id}`).catch(
      catchAxiosError
    );
    return response;
  };
  public updateAvatar = async (body: any): Promise<IResponse> => {
    const response: IResponse = await apiPatch(`${UPDATE_AVATAR}`, {
      id: body.id,
      avatar: body.avatar,
    }).catch(catchAxiosError);
    return response;
  };
  public updateCoverImage = async (body: any): Promise<IResponse> => {
    const response: IResponse = await apiPatch(`${UPDATE_COVER}`, {
      id: body.id,
      coverImage: body.coverImage,
    }).catch(catchAxiosError);
    return response;
  };
  public updateProfile = async (
    body: UpdateProfileProps
  ): Promise<IResponse> => {
    const response: IResponse = await apiPatch(`${UPDATE_PROFILE}`, {
      id: body.id,
      fullname: body.fullname,
      mobilephone: body.mobilephone,
      address: body.address,
      website: body.website,
      story: body.story,
      sex: body.sex,
    }).catch(catchAxiosError);
    return response;
  };
  public updateStory = async (body: any): Promise<IResponse> => {
    const response: IResponse = await apiPatch(`${UPDATE_STORY}`, {
      id: body.id,

      story: body.story,
    }).catch(catchAxiosError);
    return response;
  };
  public follow = async (body: any): Promise<IResponse> => {
    const response: IResponse = await apiPatch(
      `${FOLLOW}/${body.user._id}/follow`,
      {}
    ).catch(catchAxiosError);
    return response;
  };
  public unfollow = async (body: any): Promise<IResponse> => {
    const response: IResponse = await apiPatch(
      `${UN_FOLLOW}/${body.user._id}/unfollow`,
      {}
    ).catch(catchAxiosError);
    return response;
  };
}
