import { getDataAPI, postDataAPI } from '@/utils/fetchData';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { imageUpload, videoUpload } from '@/utils/imageUpload';
import { showLoading } from '../loading/loadingSlice';
import { getPostsSaved } from './savedPostsSlice';

export const getSavedPosts =
  ({ token }: { token: any }) =>
  async (dispatch: any) => {
    try {
      dispatch(showLoading(true));
      const res = await getDataAPI(`getSavePosts`, token);

      dispatch(getPostsSaved(res?.data));
      dispatch(showLoading(false));
      return res;
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
