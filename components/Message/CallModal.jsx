import { useAppDispatch, useAppSelector } from '@/store/hook';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Avatar from '../Common/Avatar';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import { callRedux } from '@/store/call/callSlice';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { addMessage } from '@/store/message/messageAction';
// import RingRing from '../../components/audio/ringring.mp3';
const CallModal = () => {
  const call = useAppSelector((state) => state.callSlice.call);
  const auth = useAppSelector((state) => state.authSlice.auth);
  const socket = useAppSelector((state) => state.socketSlice.socket);
  const peer = useAppSelector((state) => state.peerSlice.peer);
  const dispatch = useAppDispatch();
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);
  const youVideo = useRef();
  const otherVideo = useRef();
  const [tracks, setTracks] = useState(null);
  const [newCall, setNewCall] = useState(null);
  // stream media
  const openStream = (video) => {
    const config = { audio: true, video };
    return navigator.mediaDevices.getUserMedia(config);
  };
  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };
  const handleAnswer = () => {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);
      const newCall = peer.call(call.peerId, stream);
      newCall.on('stream', function (remoteStream) {
        playStream(otherVideo.current, remoteStream);
      });
      setAnswer(true);
      setNewCall(newCall);
    });
  };
  // End Call
  const addCallMessage = useCallback(
    (call, times, disconnect) => {
      if (call.recipient !== auth.user._id || disconnect) {
        const msg = {
          sender: call.sender,
          recipient: call.recipient,
          text: '',
          media: [],
          call: { video: call.video, times },
          createdAt: new Date().toISOString(),
        };
        dispatch(addMessage({ msg, auth, socket }));
      }
    },
    [auth, dispatch, socket]
  );
  const handleEndCall = () => {
    tracks && tracks.forEach((track) => track.stop());
    if (newCall) newCall.close();
    let times = answer ? total : 0;
    socket.emit('endCall', { ...call, times });

    addCallMessage(call, times);
    dispatch(callRedux(null));
  };

  // set time
  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);
  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);

  // end call
  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit('endCall', { ...call, times: 0 });
        addCallMessage(call, 0);
        dispatch(callRedux(null));
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    peer.on('call', (newCall) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }
        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);
        newCall.on('stream', function (remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          }
        });
        setAnswer(true);
        setNewCall(newCall);
      });
    });
    return () => peer.removeListener('call');
  }, [peer, call.video]);

  useEffect(() => {
    socket.on('endCallToClient', (data) => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      addCallMessage(data, data.times);
      dispatch(callRedux(null));
    });

    return () => socket.off('endCallToClient');
  }, [socket, dispatch, tracks, addCallMessage, newCall]);

  // Disconnect
  useEffect(() => {
    socket.on('callerDisconnect', () => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      let times = answer ? total : 0;
      addCallMessage(call, times, true);

      dispatch(callRedux(null));

      showToastMessage(dispatch, `${call.username} disconnect`, 'error');
    });

    return () => socket.off('callerDisconnect');
  }, [socket, tracks, dispatch, call, answer, total, newCall, addCallMessage]);

  // Play - Pause Audio
  const playAudio = (newAudio) => {
    newAudio.play();
  };

  const pauseAudio = (newAudio) => {
    newAudio.pause();
    newAudio.currentTime = 0;
  };

  // useEffect(() => {
  //   let newAudio = new Audio(RingRing);
  //   if (answer) {
  //     pauseAudio(newAudio);
  //   } else {
  //     playAudio(newAudio);
  //   }

  //   return () => pauseAudio(newAudio);
  // }, [answer]);

  return (
    <div className="call_modal">
      <div
        className="call_box"
        style={{ display: answer && call.video ? 'none' : 'flex' }}
      >
        <div className="flex flex-col items-center justify-center">
          <Avatar alt="Remy Sharp" src={call?.avatar} size="supper-avatar" />
          <h4 className="text-xl font-semibold">{call?.username}</h4>
          <h6 className="text-base font-semibold">{call?.fullname}</h6>
          {answer ? (
            <div>
              <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
              <span>:</span>
              <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
              <span>:</span>
              <span>
                {second.toString().length < 2 ? '0' + second : second}
              </span>
            </div>
          ) : (
            <div>
              {call.video ? (
                <span>calling video...</span>
              ) : (
                <span>calling audio...</span>
              )}
            </div>
          )}
        </div>
        {!answer && (
          <div className="timer">
            <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
            <small>:</small>
            <small>
              {second.toString().length < 2 ? '0' + second : second}
            </small>
          </div>
        )}

        <div className="call_menu mt-2">
          <div className="button">
            <CallEndIcon onClick={handleEndCall} style={{ color: 'red' }} />
          </div>

          {call.recipient === auth.user._id && !answer && (
            <>
              {call.video ? (
                <div className="button mt-2">
                  <VideocamIcon
                    onClick={handleAnswer}
                    style={{ color: 'green' }}
                  />
                </div>
              ) : (
                <div className="button">
                  <CallIcon onClick={handleAnswer} style={{ color: 'green' }} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div
        className="show_video"
        style={{
          opacity: answer && call.video ? '1' : '0',
        }}
      >
        <video ref={youVideo} className="you_video" playsInline muted />
        <video ref={otherVideo} className="other_video" playsInline />

        <div className="time_video">
          <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
          <span>:</span>
          <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
          <span>:</span>
          <span>{second.toString().length < 2 ? '0' + second : second}</span>
        </div>

        <button className="  end_call" onClick={handleEndCall}>
          <CallEndIcon style={{ color: 'red' }} />
        </button>
      </div>
    </div>
  );
};

export default CallModal;
