import { showToastMessage } from '@/utils/helper/showToastMessage';

import { getDataAPI, patchDataAPI } from '@/utils/fetchData';
import { setAuth } from '../auth/authSlice';
import { DeleteData } from '../globalTypes';
import {
  followUser,
  getIdProfile,
  getPosts,
  getUser,
  unfollowUser,
} from './profileSlice';
import { createNotify, removeNotify } from '../notify/notifyAction';

export const follow =
  ({ users, user, auth, socket }: any) =>
  async (dispatch: any) => {
    let newUser;

    if (users.every((item: any) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item: any) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }

    dispatch(followUser(newUser));
    dispatch(
      setAuth({
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      })
    );

    socket.emit('follow', newUser);

    try {
      await patchDataAPI(`user/${user._id}/follow`, null, auth.token);
      const msg = {
        id: auth?.user?._id,
        text: 'has started to follow you',
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (err: any) {
      // dispatch({
      //   type: GLOBALTYPES.ALERT,
      //   payload: {
      //     error: err.response.data.msg,
      //   },
      // });
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };

export const unfollow =
  ({ users, user, auth, socket }: any) =>
  async (dispatch: any) => {
    let newUser;

    if (users.every((item: any) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: DeleteData(user.followers, auth.user._id),
      };
    } else {
      users.forEach((item: any) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: DeleteData(item.followers, auth.user._id),
          };
        }
      });
    }

    dispatch(unfollowUser(newUser));
    dispatch(
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      })
    );
    socket.emit('unFollow', newUser);

    try {
      await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);

      const msg = {
        id: auth?.user?._id,
        text: 'has started to follow you',
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };
      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const getProfileUsers =
  ({ users, id, auth }: any) =>
  async (dispatch: any) => {
    dispatch(getIdProfile(id));

    try {
      const res = getDataAPI(`user/${id}`, auth.token);

      const res1 = await getDataAPI(`user_posts/${id}`, auth.token);
      const users = await res;
      const posts = await res1;
      dispatch(getPosts({ ...posts.data, _id: id, page: 2 }));
      dispatch(getUser(users.data));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
