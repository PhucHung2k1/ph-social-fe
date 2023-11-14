import { getDataAPI } from '@/utils/fetchData';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { showLoading } from '../loading/loadingSlice';
import { getSuggestionRedux } from './suggestionSlice';

export const getSuggestion = (token: any) => async (dispatch: any) => {
  try {
    // dispatch(showLoading(true));
    const res = await getDataAPI('suggestionUser', token);

    dispatch(getSuggestionRedux(res?.data));

    // dispatch(showLoading(false));
  } catch (err: any) {
    showToastMessage(dispatch, err.response.data.msg, 'error');
  }
};
