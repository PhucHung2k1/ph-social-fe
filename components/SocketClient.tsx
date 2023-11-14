import { setAuth } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { updatePost } from '@/store/post/postAction';
import { setIsChange } from '@/store/user/userSlice';
import { useEffect, useState } from 'react';

const SocketClient = () => {
  const auth = useAppSelector((state: any) => state.authSlice.auth);
  const socket = useAppSelector((state: any) => state.socketSlice.socket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socket && auth) {
      socket.emit('joinUser', auth?.user?._id);
    }
  }, [auth, socket]);

  useEffect(() => {
    socket.on('likeToClient', (newPost: any) => {
      const payload = {
        content: newPost?.content,
        images: newPost?.images,
        auth,
        postId: newPost?._id,
        feelingImage: newPost.feelingImage,
        feelingStatus: newPost?.feelingStatus,
        isActivity: newPost?.isActivity || false,
      };

      dispatch(updatePost(payload));
      dispatch(setIsChange());
    });
    return () => socket.off('likeToClient');
  }, [auth, dispatch, socket]);

  useEffect(() => {
    socket.on('unLikeToClient', (newPost: any) => {
      const payload = {
        content: newPost?.content,
        images: newPost?.images,
        auth,
        postId: newPost?._id,
        feelingImage: newPost.feelingImage,
        feelingStatus: newPost?.feelingStatus,
        isActivity: newPost?.isActivity || false,
      };

      dispatch(updatePost(payload));
      dispatch(setIsChange());
    });
    return () => socket.off('unLikeToClient');
  }, [auth, dispatch, socket]);

  // cmts
  useEffect(() => {
    socket.on('createCommentToClient', (newPost: any) => {
      const payload = {
        content: newPost?.content,
        images: newPost?.images,
        auth,
        postId: newPost?._id,
        feelingImage: newPost.feelingImage,
        feelingStatus: newPost?.feelingStatus,
        isActivity: newPost?.isActivity || false,
      };

      dispatch(updatePost(payload));
      dispatch(setIsChange());
    });
    return () => socket.off('createCommentToClient');
  }, [auth, dispatch, socket]);

  useEffect(() => {
    socket.on('deleteCommentToClient', (newPost: any) => {
      const payload = {
        content: newPost?.content,
        images: newPost?.images,
        auth,
        postId: newPost?._id,
        feelingImage: newPost.feelingImage,
        feelingStatus: newPost?.feelingStatus,
        isActivity: newPost?.isActivity || false,
      };

      dispatch(updatePost(payload));
      dispatch(setIsChange());
    });
    return () => socket.off('deleteCommentToClient');
  }, [auth, dispatch, socket]);

  useEffect(() => {
    socket.on('updateCommentToClient', (newPost: any) => {
      const payload = {
        content: newPost?.content,
        images: newPost?.images,
        auth,
        postId: newPost?._id,
        feelingImage: newPost.feelingImage,
        feelingStatus: newPost?.feelingStatus,
        isActivity: newPost?.isActivity || false,
      };

      dispatch(updatePost(payload));
      dispatch(setIsChange());
    });
    return () => socket.off('updateCommentToClient');
  }, [auth, dispatch, socket]);

  useEffect(() => {
    socket.on('likeCommentToClient', (newPost: any) => {
      const payload = {
        content: newPost?.content,
        images: newPost?.images,
        auth,
        postId: newPost?._id,
        feelingImage: newPost.feelingImage,
        feelingStatus: newPost?.feelingStatus,
        isActivity: newPost?.isActivity || false,
      };

      dispatch(updatePost(payload));
      dispatch(setIsChange());
    });
    return () => socket.off('likeCommentToClient');
  }, [auth, dispatch, socket]);

  useEffect(() => {
    socket.on('unLikeCommentToClient', (newPost: any) => {
      const payload = {
        content: newPost?.content,
        images: newPost?.images,
        auth,
        postId: newPost?._id,
        feelingImage: newPost.feelingImage,
        feelingStatus: newPost?.feelingStatus,
        isActivity: newPost?.isActivity || false,
      };

      dispatch(updatePost(payload));
      dispatch(setIsChange());
    });
    return () => socket.off('unLikeCommentToClient');
  }, [auth, dispatch, socket]);

  // Follow

  useEffect(() => {
    socket.on('followToClient', (newUser: any) => {
      dispatch(
        setAuth({
          ...auth,
          user: newUser,
        })
      );
      dispatch(setIsChange());
    });
    return () => socket.off('followToClient');
  }, [auth, dispatch, socket]);

  useEffect(() => {
    socket.on('unFollowToClient', (newUser: any) => {
      dispatch(
        setAuth({
          ...auth,
          user: newUser,
        })
      );
      dispatch(setIsChange());
    });
    return () => socket.off('unFollowToClient');
  }, [auth, dispatch, socket]);

  return <div></div>;
};

export default SocketClient;
