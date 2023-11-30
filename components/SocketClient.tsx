import { setAuth } from '@/store/auth/authSlice';
import { callRedux } from '@/store/call/callSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
// import addNotification from 'react-push-notification';
import {
  addMessageRedux,
  messageAddUserRedux,
} from '@/store/message/messageSlice';
import {
  createNotifyRedux,
  removeNotifyRedux,
} from '@/store/notify/notifySlice';
import { setOffline, setOnline } from '@/store/online/onlineSlice';
import { updatePost } from '@/store/post/postAction';
import { setIsChange } from '@/store/user/userSlice';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocketClient = () => {
  const router = useRouter();
  const auth = useAppSelector((state: any) => state.authSlice.auth);
  const online = useAppSelector((state) => state.onlineSlice.users);
  const socket = useAppSelector((state: any) => state.socketSlice.socket);
  const call = useAppSelector((state) => state.callSlice.call);
  const dispatch = useAppDispatch();
  const spawnNotification = (body: any, icon: any, url: any, title: any) => {
    let options = {
      body,
      icon,
    };
    let n = new Notification(title, options);

    n.onclick = (e) => {
      e.preventDefault();

      window.open(url, '_blank');
    };
  };
  useEffect(() => {
    if (socket && auth?.user) {
      socket?.emit('joinUser', auth?.user);
    }
  }, [auth, auth?.user, socket]);

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      console.log('errr');
    } else if (Notification.permission === 'granted') {
      console.log('granted');
    } else if (Notification.permission !== 'denied') {
      console.log('denied');
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
        }
      });
    }
  }, []);

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

  // Notification

  useEffect(() => {
    socket.on('createNotifyToClient', (msg: any) => {
      dispatch(createNotifyRedux(msg));
      dispatch(setIsChange());
      spawnNotification(
        msg.user.username + ' ' + msg.text,
        msg.user.avatar,
        msg.url,
        'PH SOCIAL'
      );
      toast(`${msg.user.username} ${msg.text}`, {
        position: 'bottom-right',
        autoClose: 2000, // Đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClick: () => {
          router.push(`${msg.url}`);
        },
      });

      // addNotification({
      //   title: `${msg.user.username}`,
      //   subtitle: `${msg.text}`,
      //   message: 'This is a very long message',
      //   theme: 'light',
      //   native: true, // when using native, your OS will handle theming.
      // });
    });
    return () => socket.off('createNotifyToClient');
  }, [auth, dispatch, socket]);

  useEffect(() => {
    socket.on('removeNotifyToClient', (msg: any) => {
      dispatch(removeNotifyRedux(msg));
      dispatch(setIsChange());
    });
    return () => socket.off('removeNotifyToClient');
  }, [auth, dispatch, socket]);

  useEffect(() => {
    socket.on('addMessageToClient', (msg: any) => {
      dispatch(addMessageRedux(msg));
      dispatch(
        messageAddUserRedux({ ...msg.user, text: msg.text, media: msg.media })
      );
      dispatch(setIsChange());
    });
    return () => socket.off('addMessageToClient');
  }, [auth, dispatch, socket]);

  // onl off status

  useEffect(() => {
    socket.emit('checkUserOnline', auth.user);
  }, [auth.user, socket]);

  useEffect(() => {
    socket.on('checkUserOnlineToMe', (data: any) => {
      data.forEach((item: any) => {
        if (!online.includes(item.id)) {
          dispatch(setOnline(item.id));
        }
      });
    });
    return () => socket.off('checkUserOnlineToMe');
  }, [auth.user, dispatch, online, socket]);

  useEffect(() => {
    socket.on('checkUserOnlineToClient', (id: any) => {
      if (!online.includes(id)) {
        dispatch(setOnline(id));
      }
    });
    return () => socket.off('checkUserOnlineToClient');
  }, [auth.user, dispatch, online, socket]);

  // Check User Offline
  useEffect(() => {
    socket.on('CheckUserOffline', (id: any) => {
      dispatch(setOffline(id));
    });

    return () => socket.off('CheckUserOffline');
  }, [socket, dispatch]);
  // call user
  useEffect(() => {
    socket.on('callUserToClient', (data: any) => {
      dispatch(callRedux(data));
    });

    return () => socket.off('callUserToClient');
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('endCallToClient', (data: any) => {
      dispatch(callRedux(null));
      // dispatch({ type: GLOBALTYPES.CALL, payload: null });
    });

    return () => socket.off('endCallToClient');
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('userBusy', (data: any) => {
      showToastMessage(dispatch, `${data.username} is busy!`, 'error');
    });

    return () => socket.off('userBusy');
  }, [socket, dispatch, call]);

  return <div>{/* <NotificationButton /> */}</div>;
};

export default SocketClient;
