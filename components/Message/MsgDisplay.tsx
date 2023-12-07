import React from 'react';
import Avatar from '../Common/Avatar';
import { imageShow, videoShow } from '@/utils/mediaShow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { deleteMessages } from '@/store/message/messageAction';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallIcon from '@mui/icons-material/Call';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import Times from './Times';
type MsgDisplayProps = {
  user: any;
  msg: any;
  data?: any;
};

const MsgDisplay: React.FC<MsgDisplayProps> = ({ user, msg, data }) => {
  const auth = useAppSelector((state: any) => state.authSlice.auth);
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state: any) => state.socketSlice.socket);
  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteMessages({ msg, data, auth, socket }));
    }
  };
  return (
    <>
      <div className="chat_title flex gap-2">
        <Avatar src={user?.avatar} size="small-avatar" />
        <span>{user?.username}</span>
      </div>
      <div className="you_content">
        {auth.user._id === user._id && (
          <div className="fas fa-trash" onClick={handleDeleteMessages}>
            <DeleteOutlineIcon style={{ color: 'red' }} />
          </div>
        )}
        <div>
          {msg.text && <div className="chat_text">{msg.text}</div>}
          {msg.media.map((item: any, index: any) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url)
                : imageShow(item.url)}
            </div>
          ))}
        </div>
        {msg.call && (
          <button
            className="btn flex items-center p-3"
            style={{ background: '#eee', borderRadius: '10px' }}
          >
            <span
              className="material-icons font-weight-bold mr-1"
              style={{
                fontSize: '2.5rem',
                color: msg.call.times === 0 ? 'crimson' : 'green',
              }}
            >
              {msg.call.times === 0 ? (
                msg.call.video ? (
                  <VideocamOffIcon />
                ) : (
                  <PhoneDisabledIcon />
                )
              ) : msg.call.video ? (
                <VideoCameraFrontIcon />
              ) : (
                <CallIcon />
              )}
            </span>

            <div className="text-left">
              <h6>{msg.call.video ? 'Video Call' : 'Audio Call'}</h6>
              <small>
                {msg.call.times > 0 ? (
                  <Times total={msg.call.times} />
                ) : (
                  new Date(msg.createdAt).toLocaleTimeString()
                )}
              </small>
            </div>
          </button>
        )}
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
      {/* </div> */}
    </>
  );
};

export default MsgDisplay;
