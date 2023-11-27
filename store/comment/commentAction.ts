import { PostData } from '@/components/Posts/PostItem';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { Auth } from '../auth/authSlice';
import { updatePostRedux } from '../post/postSlice';
import { deleteDataAPI, patchDataAPI, postDataAPI } from '@/utils/fetchData';
import { DeleteData, EditData } from '../globalTypes';
import { createNotify, removeNotify } from '../notify/notifyAction';

export const createComment =
  (post: PostData, newComment: any, auth: Auth, socket: any) =>
  async (dispatch: any) => {
    const newPost = { ...post, comments: [...post?.comments, newComment] };

    dispatch(updatePostRedux(newPost));

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postDataAPI('comment', data, auth?.token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch(updatePostRedux(newPost));

      // socket
      socket.emit('createComment', newPost);

      // notify

      const msg = {
        id: auth?.user?._id,
        text: newComment?.reply
          ? 'mentioned you in a comment.'
          : 'has commented on your post.',
        recipients: newComment?.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0]?.url,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const updateComment =
  ({
    comment,
    post,
    content,
    auth,
    socket,
  }: {
    comment: any;
    post: PostData;
    content: any;
    auth: Auth;
    socket: any;
  }) =>
  async (dispatch: any) => {
    const newComment = EditData(post.comments, comment?._id, {
      ...comment,
      content,
    });
    const newPost = { ...post, comments: newComment };
    dispatch(updatePostRedux(newPost));

    socket.emit('updateComment', newPost);

    try {
      patchDataAPI(`comment/${comment._id}`, { content }, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const likeComment =
  ({
    comment,
    post,
    auth,
    socket,
  }: {
    comment: any;
    post: PostData;
    auth: Auth;
    socket: any;
  }) =>
  async (dispatch: any) => {
    console.log({ comment, post, auth });
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };
    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };
    dispatch(updatePostRedux(newPost));
    socket.emit('likeComment', newPost);
    try {
      await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const unLikeComment =
  ({
    comment,
    post,
    auth,
    socket,
  }: {
    comment: any;
    post: PostData;

    auth: Auth;
    socket: any;
  }) =>
  async (dispatch: any) => {
    console.log({ comment, post, auth });
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };
    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };
    dispatch(updatePostRedux(newPost));
    socket.emit('unLikeComment', newPost);
    try {
      await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
export const deleteComment =
  ({
    post,
    auth,
    comment,
    socket,
  }: {
    post: PostData;
    auth: Auth;
    comment: any;
    socket: any;
  }) =>
  async (dispatch: any) => {
    // const newComment = {
    //   ...comment,
    //   likes: DeleteData(comment.likes, auth.user._id),
    // };
    // const newComments = EditData(post.comments, comment._id, newComment);

    // const newPost = { ...post, comments: newComments };
    // dispatch(updatePostRedux(newPost));
    const deleteArr = [
      ...post.comments.filter((item) => item.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (cm) => !deleteArr.find((da) => cm._id === da._id)
      ),
    };
    dispatch(updatePostRedux(newPost));
    socket.emit('deleteComment', newPost);

    try {
      deleteArr.forEach((item) => {
        deleteDataAPI(`comment/${item._id}`, auth.token);
        const msg = {
          id: item.user._id,
          text: comment.reply
            ? 'mentioned you in a comment.'
            : 'has commented on your post.',
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
        };
        dispatch(removeNotify({ msg, auth, socket }));
      });
    } catch (err: any) {
      showToastMessage(dispatch, err.response.data.msg, 'error');
    }
  };
