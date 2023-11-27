import { PostData } from '@/components/HomePage/LikeButton';
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from '@/utils/fetchData';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { imageUpload, videoUpload } from '@/utils/imageUpload';
import { Auth, setAuth } from '../auth/authSlice';
import {
  createPostRedux,
  deletePostRedux,
  getPostsRedux,
  updatePostRedux,
} from './postSlice';
import { createNotify, removeNotify } from '../notify/notifyAction';
import { getPostDetailRedux } from '../detailPost/detailPostSlice';

export const createPost =
  ({
    content,
    images,
    auth,
    feelingStatus,
    feelingImage,
    isActivity,
    socket,
  }: {
    content: any;
    images: any;
    auth: any;
    feelingImage: any;
    feelingStatus: any;
    isActivity: boolean;
    socket: any;
  }) =>
  async (dispatch: any) => {
    let mediaImage: any = [];
    let mediaVideo: any = [];
    try {
      if (images.length > 0) {
        const arrImages = images.filter(
          (item: any) => item.type !== 'video/mp4'
        );
        const arrVideos = images.filter(
          (item: any) => item.type === 'video/mp4'
        );
        if (arrImages.length > 0) {
          mediaImage = await imageUpload(arrImages);
        }
        if (arrVideos.length > 0) {
          mediaVideo = await videoUpload(arrVideos);
        }
      }

      const media = [...mediaImage, ...mediaVideo];

      const res = await postDataAPI(
        'posts',
        { content, images: media, feelingStatus, feelingImage, isActivity },
        auth.token
      );
      dispatch(createPostRedux({ ...res?.data?.newPost, user: auth.user }));

      //notify

      const msg = {
        id: res?.data?.newPost?._id,
        text: 'added a new post',
        recipients: res?.data?.newPost?.user?.followers,
        url: `/post/${res.data.newPost._id}`,
        content,
        image: media[0]?.url,
      };
      dispatch(createNotify({ msg, auth, socket }));

      return res;
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const getPosts = (token: any) => async (dispatch: any) => {
  try {
    const res = await getDataAPI('posts', token);

    dispatch(getPostsRedux(res?.data));
  } catch (err: any) {
    showToastMessage(dispatch, err.response.data.msg, 'error');
  }
};
export const getPost =
  ({ detailPost, id, auth }: any) =>
  async (dispatch: any) => {
    if (detailPost.every((post: any) => post._id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);
        dispatch(getPostDetailRedux(res.data.post));
        // dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
      } catch (err: any) {
        showToastMessage(dispatch, err.response.data.msg, 'error');
      }
    }
  };
export const updatePost =
  ({
    content,
    images,
    auth,
    postId,
    feelingImage,
    feelingStatus,
    isActivity,
  }: {
    content: any;
    images: any;
    auth: any;
    postId: any;
    feelingImage: any;
    feelingStatus: any;
    isActivity: boolean;
  }) =>
  async (dispatch: any) => {
    let media: any = [];
    const imgNewUrl = images.filter((img: any) => !img.url);
    const imgOldUrl = images.filter((img: any) => img.url);

    try {
      if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);
      const res = await patchDataAPI(
        `post/${postId}`,
        {
          content,
          images: [...imgOldUrl, ...media],
          feelingImage,
          feelingStatus,
          isActivity,
        },
        auth.token
      );

      dispatch(updatePostRedux(res?.data?.newPost));

      // if (socket) {
      //   socket.emit('updatePost', res?.data?.newPost);
      // }
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const likePost =
  ({ post, auth, socket }: { post: PostData; auth: Auth; socket: any }) =>
  async (dispatch: any) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    dispatch(updatePostRedux(newPost));

    socket.emit('likePost', newPost);

    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);

      const msg = {
        id: auth?.user?._id,
        text: 'like your post',
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0]?.url,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const unLikePost =
  ({ post, auth, socket }: { post: PostData; auth: Auth; socket: any }) =>
  async (dispatch: any) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((item) => item._id !== auth.user._id),
    };

    dispatch(updatePostRedux(newPost));
    socket.emit('unLikePost', newPost);

    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

      const msg = {
        id: auth?.user?._id,
        text: 'like your post',
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0]?.url,
      };
      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const deletePost =
  ({ post, auth, socket }: { post: PostData; auth: Auth; socket: any }) =>
  async (dispatch: any) => {
    dispatch(deletePostRedux(post));
    try {
      const res = await deleteDataAPI(`post/${post._id}`, auth.token);

      const msg = {
        id: res?.data?.newPost?._id,
        text: 'added a new post',
        recipients: res?.data?.newPost?.user?.followers,
        url: `/post/${post._id}`,
      };
      dispatch(removeNotify({ msg, auth, socket }));

      // return res;
    } catch (err: any) {
      // showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const savePost =
  ({ post, auth }: { post: PostData; auth: Auth }) =>
  async (dispatch: any) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };

    dispatch(
      setAuth({
        ...auth,
        user: newUser,
      })
    );
    try {
      await patchDataAPI(`savePost/${post._id}`, null, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const unSavePost =
  ({ post, auth }: { post: PostData; auth: Auth }) =>
  async (dispatch: any) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((item) => item !== post._id),
    };

    dispatch(
      setAuth({
        ...auth,
        user: newUser,
      })
    );
    try {
      await patchDataAPI(`unSavePost/${post._id}`, null, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
