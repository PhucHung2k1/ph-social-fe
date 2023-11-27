/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { deleteAllNotifies, isReadNotify } from '@/store/notify/notifyAction';
import { updateSoundRedux } from '@/store/notify/notifySlice';
import { NotificationsActiveOutlined } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Badge, IconButton, Popover } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import Avatar from './Avatar';
import { useTranslation } from 'react-i18next';
const NotifyModal = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: any) => state.authSlice.auth);
  const { t } = useTranslation();

  const notify = useAppSelector((state: any) => state.notifySlice);
  const length = notify?.data?.filter((item: any) => !item.isRead);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleSound = () => {
    dispatch(updateSoundRedux(!notify.sound));
  };
  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item: any) => item.isRead === false);

    if (newArr.length === 0) return dispatch(deleteAllNotifies({ auth }));

    if (
      window.confirm(
        `You have ${newArr.length} unread notices. Are you sure you want to delete all?`
      )
    ) {
      return dispatch(deleteAllNotifies({ auth }));
    }
  };
  const handleIsRead = (msg: any) => {
    dispatch(isReadNotify({ msg, auth }));
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={length?.length || 0} color="error">
          <NotificationsActiveOutlined />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="min-w-[400px] py-3 px-2">
          <div className="flex items-center justify-between px-3">
            <h1 className="text-[25px] font-bold">{t('notifications')}</h1>
          </div>
          <hr className="mt-0" />
          {notify.data.length === 0 && (
            <div className="flex items-center justify-center">
              <img src="/images/notice.png" alt="NoNotice" className="w-100" />
            </div>
          )}
          <div className="max-h-[calc(100vh-200px)] overflow-auto">
            {notify.data.map((msg: any, index: any) => (
              <div
                key={index}
                className={`px-2 py-3 rounded-md hover:bg-gray-200 ${
                  msg.isRead && ' rounded-md bg-gray-200 opacity-50'
                }`}
              >
                <Link
                  href={`${msg?.url}`}
                  className="flex text-dark items-center gap-2"
                  onClick={() => {
                    handleIsRead(msg);
                    handleClose();
                  }}
                >
                  <Avatar src={msg.user.avatar} size="big-avatar" />

                  <div className="mx-1 flex-grow">
                    <div>
                      <strong className="mr-1">{msg.user.username}</strong>
                      <span>{msg.text}</span>
                    </div>
                    {msg.content && (
                      <small>{msg.content.slice(0, 20)}...</small>
                    )}
                    <small className="text-blue-500 flex justify-between">
                      {moment(msg.createdAt).fromNow()}
                    </small>
                  </div>

                  {!msg.isRead && (
                    <FiberManualRecordIcon
                      style={{ color: 'blue', fontSize: '15px' }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          <hr className="my-1" />

          <div
            className="text-right text-red-500 mr-2 cursor-pointer"
            onClick={handleDeleteAll}
          >
            {t('deleteAll')}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default NotifyModal;
