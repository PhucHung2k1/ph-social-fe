import { getDataAPI, postDataAPI } from '@/utils/fetchData';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { imageUpload, videoUpload } from '@/utils/imageUpload';
import { showLoading } from '../loading/loadingSlice';
import { getPostsDiscover } from './discoverSlice';

export const getDiscoverPosts =
  ({ token }: { token: any }) =>
  async (dispatch: any) => {
    try {
      dispatch(showLoading(true));
      const res = await getDataAPI(`post_discover`, token);

      dispatch(getPostsDiscover(res?.data));
      dispatch(showLoading(false));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
