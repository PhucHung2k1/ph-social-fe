import { Avatar, Button, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import FollowBtn from '../Common/FollowBtn';
import { useAppSelector } from '@/store/hook';
interface UserData {
  avatar: string;
  followers: string[]; // Mảng chứa các chuỗi
  following: string[]; // Mảng chứa các chuỗi
  fullname: string;
  username: string;
  _id: string;
}
interface UserItemModalProps {
  item: UserData;
  setOpen: any;
}

const UserItemModal: React.FC<UserItemModalProps> = ({ item, setOpen }) => {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const router = useRouter();
  return (
    <div className="flex items-center justify-between px-4 mb-4">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => {
          router.push(`/profile/${item._id}`);
          setOpen(false);
        }}
      >
        {item?.avatar ? (
          <Avatar
            alt="Remy Sharp"
            src={item.avatar || ''}
            sx={{ width: 44, height: 44 }}
            className="mr-3 "
          />
        ) : (
          <Skeleton
            variant="circular"
            width={44}
            height={44}
            animation="wave"
          />
        )}
        <div className="font-medium">{item?.username}</div>
      </div>
      <div>
        {item._id !== auth?.user?._id && <FollowBtn user={item} small />}
      </div>
    </div>
  );
};

export default UserItemModal;
