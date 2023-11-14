import { IResponse } from '@/utils/aixios/entities';
import { catchAxiosError } from '@/utils/aixios/error';
import { apiGet, apiPatch, apiPost } from '@/utils/aixios/instance';

const FOLLOW = '/api/user/';
const UN_FOLLOW = '/api/user/';

export class ProfileService {
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
