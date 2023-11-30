import { useAppDispatch, useAppSelector } from '@/store/hook';
import { follow, unfollow } from '@/store/profile/profileAction';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface FollowBtnProps {
  user: any;
  small?: boolean;
}

const FollowBtn: React.FC<FollowBtnProps> = ({ user, small }) => {
  const [followed, setFollowed] = useState(false);
  const dispatch = useAppDispatch();
  const [load, setLoad] = useState(false);
  const auth = useAppSelector((state) => state.authSlice.auth);
  const socket = useAppSelector((state: any) => state.socketSlice.socket);
  const { t } = useTranslation();
  const profile = useAppSelector((state) => state.profileSlice);

  useEffect(() => {
    if (auth?.user?.following?.find((item: any) => item?._id === user?._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth?.user?.following, user?._id]);

  const handleFollow = () => {
    if (load) return;
    setFollowed(true);
    setLoad(true);
    setLoad(false);
    dispatch(
      follow({
        users: profile.users,
        user,
        auth,
        socket,
      })
    ).then((res) => {});
  };

  const handleUnFollow = () => {
    if (load) return;
    setFollowed(false);
    setLoad(true);
    dispatch(
      unfollow({
        users: profile.users,
        user,
        auth: auth,
        socket,
      })
    ).then((res) => {});
    setLoad(false);
  };
  return (
    <>
      {followed ? (
        <Button
          variant="outlined"
          className={
            '!bg-orange-500 w-28 !text-white hover:opacity-75 !text-[13px]' +
            (small ? ' w-24 normal-case text-base' : ' w-28')
          }
          onClick={handleUnFollow}
        >
          {t('unFollow')}
        </Button>
      ) : (
        <Button
          variant="outlined"
          className={
            '!bg-blue-500  !text-white hover:opacity-75 !text-[13px]' +
            (small ? ' w-24 normal-case text-base' : ' w-28')
          }
          onClick={handleFollow}
        >
          {t('follow')}
        </Button>
      )}
    </>
  );
};

export default React.memo(FollowBtn);
