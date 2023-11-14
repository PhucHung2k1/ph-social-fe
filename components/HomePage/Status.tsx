/* eslint-disable react/no-unescaped-entities */
import { useAppSelector } from '@/store/hook';
import { Avatar, IconButton, Skeleton } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalCreatePost from './ModalCreatePost';
import ModalActivityFeeling from './ModalActivityFeeling';

const Status = () => {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const [open, setOpen] = useState(false);
  const [typeModal, setTypeModal] = useState('create');
  return (
    <div className="w-full">
      <ModalCreatePost
        open={open}
        setOpen={setOpen}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
      />

      <div className="flex flex-col items-center w-full bg-white rounded-xl px-4 shadow pt-4 pb-2">
        <div className="flex items-center gap-2 w-full border-b  border-gray-300 pb-4">
          {auth ? (
            <IconButton
              size="small"
              sx={{ ml: 2 }}
              className="w-[40px] h-[40px]"
            >
              <Avatar
                alt="Remy Sharp"
                src={auth?.user?.avatar || ''}
                sx={{ width: 44, height: 44 }}
                className="mr-3 cursor-pointer"
              />
            </IconButton>
          ) : (
            <Skeleton
              variant="circular"
              width={44}
              height={44}
              animation="wave"
            />
          )}

          <div
            className="w-full  cursor-pointer bg-main-home text-base rounded-full h-10 flex items-center justify-start px-4 text-text-gray-bold"
            onClick={() => {
              setOpen(true);
            }}
          >
            What's in your mind, {auth?.user?.fullname}?
          </div>
        </div>
        <div className="flex items-center justify-between w-full pt-2 sm:text-base text-sm">
          <div className="flex items-center justify-center sm:px-5 px-1  gap-2 h-10 rounded-xl hover:bg-main-home cursor-pointer">
            <Image
              src="/images/HomePage/feeling.png"
              alt="aa"
              width={24}
              height={24}
              priority={true}
            />
            <div>Status</div>
          </div>
          <div className="flex items-center justify-center sm:px-5 px-1  gap-2 h-10 rounded-xl hover:bg-main-home cursor-pointer">
            <Image
              src="/images/HomePage/photovideo.png"
              alt="aa"
              width={24}
              height={24}
              priority={true}
            />
            <div>Photo/Video</div>
          </div>
          <div className="flex items-center justify-center sm:px-5 px-1  gap-2 h-10 rounded-xl hover:bg-main-home cursor-pointer">
            <Image
              src="/images/HomePage/feeling.png"
              alt="aa"
              width={24}
              height={24}
              priority={true}
            />
            <div>Feeling/Activity</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
