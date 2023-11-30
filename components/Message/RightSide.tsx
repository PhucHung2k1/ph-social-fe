/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import UserCard from '../User/UserCard';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MsgDisplay from './MsgDisplay';
import ImageIcon from '@mui/icons-material/Image';
import { imageShow, videoShow } from '@/utils/mediaShow';
import { Button } from '@mui/material';
import Icons from '../Icon';
import { imageUpload, videoUpload } from '@/utils/imageUpload';
import {
  addMessage,
  deleteConversation,
  getMessage,
} from '@/store/message/messageAction';
import { callRedux } from '@/store/call/callSlice';
import { useTranslation } from 'react-i18next';
const RightSide = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const [media, setMedia] = useState<any>([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const auth = useAppSelector((state: any) => state.authSlice.auth);
  const peer = useAppSelector((state) => state.peerSlice.peer);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.messageSlice);
  const { id } = router.query;
  const [user, setUser] = useState<any>([]);
  const socket = useAppSelector((state: any) => state.socketSlice.socket);
  const refDisplay = useRef<any>();
  const pageEnd = useRef<any>();
  const [isLoadMore, setIsLoadMore] = useState(0);
  const [page, setPage] = useState<any>(0);
  const [loadPage, setLoadPage] = useState<any>(false);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText('');
    setMedia([]);
    setLoadMedia(true);

    let mediaImage: any = [];
    let mediaVideo: any = [];
    if (media.length > 0) {
      const arrImages = media.filter((item: any) => item.type !== 'video/mp4');
      const arrVideos = media.filter((item: any) => item.type === 'video/mp4');
      if (arrImages.length > 0) {
        mediaImage = await imageUpload(arrImages);
      }
      if (arrVideos.length > 0) {
        mediaVideo = await videoUpload(arrVideos);
      }
    }
    const newArr = [...mediaImage, ...mediaVideo];

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleChangeMedia = (e: any) => {
    const files = [...e.target.files];
    let err = '';
    let newMedia: any = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist.');

      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image/video largest is 5mb.');
      }

      return newMedia.push(file);
    });

    // if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index: any) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  useEffect(() => {
    const newUser = message?.users?.find((item: any) => item._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [id, message?.users]);
  // useEffect(() => {
  //   const newData = message.data.find((item: any) => item._id === id);

  //   if (newData) {
  //     setData(newData.messages);
  //     setResult(newData.result);
  //     setPage(newData.page);
  //   }
  // }, [message.data, id]);
  useEffect(() => {
    if (id && auth?.token) {
      const getMessageData = async () => {
        await dispatch(getMessage({ auth, id }));
        setPage(1);
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 50);
      };
      getMessageData();
    }
  }, [auth, dispatch, id]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p: any) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultData >= (page - 1) * 9 && page > 1) {
      dispatch(getMessage({ auth, id, page }));
    }
  }, [auth, dispatch, id, message.resultData, page]);

  const handleDeleteConversation = () => {
    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteConversation({ auth, id }));
      router.push('/messages');
    }
  };
  // call
  const caller = ({ video }: any) => {
    const { _id, avatar, username, fullname } = user;

    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      fullname,
      video,
    };
    dispatch(callRedux(msg));
  };
  const callUser = ({ video }: any) => {
    const { _id, avatar, username, fullname } = auth.user;

    const msg: any = {
      sender: _id,
      recipient: user._id,
      avatar,
      username,
      fullname,
      video,
    };

    if (peer.open) msg.peerId = peer._id;

    socket.emit('callUser', msg);
  };

  const handleAudioCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  return (
    <div className="">
      <div className="message_header">
        <UserCard user={user}>
          <div className="flex gap-4">
            <IconButton onClick={handleAudioCall}>
              <LocalPhoneIcon />
            </IconButton>
            <IconButton onClick={handleVideoCall}>
              <VideoCallIcon />
            </IconButton>
            <IconButton onClick={handleDeleteConversation}>
              <DeleteIcon style={{ color: 'red' }} />
            </IconButton>
          </div>
        </UserCard>
      </div>
      <div
        className="chat_container overflow-auto"
        style={{ height: media.length > 0 ? '65vh' : '' }}
      >
        <div className="chat_display" ref={refDisplay}>
          <button style={{ marginTop: '-25px', opacity: 0 }} ref={pageEnd}>
            Load more
          </button>
          {loadPage && <CircularProgress ref={pageEnd} />}

          {message.data.map((msg: any, index: any) => {
            return (
              <div key={index}>
                {msg.sender !== auth.user._id && (
                  <div className="chat_row other_message">
                    <MsgDisplay user={user} msg={msg} />
                  </div>
                )}
                {msg.sender === auth.user._id && (
                  <div className="chat_row you_message">
                    <MsgDisplay
                      user={auth.user}
                      msg={msg}
                      data={message.data}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {loadMedia && (
            <div className="chat_row you_message">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
      <div
        className="show_media"
        style={{ display: media.length > 0 ? 'grid' : 'none' }}
      >
        {media.map((item: any, index: any) => (
          <div key={index} id="file_media">
            {item?.type?.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : imageShow(URL.createObjectURL(item))}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>
      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('enterYourMessage')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Icons setContent={setText} content={text} />

        <div className="file_upload cursor-pointer px-1">
          <ImageIcon style={{ color: 'red' }} className="cursor-pointer" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>

        <Button
          variant="contained"
          type="submit"
          sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
          disabled={text || media.length > 0 ? false : true}
          startIcon={<SendIcon />}
          className="  rounded-lg bg-mango-primary-blue !font-semibold !text-black cursor-pointer "
        >
          {t('send')}
        </Button>
      </form>
    </div>
  );
};

export default RightSide;
