import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Button, Skeleton } from '@mui/material';
import Image from 'next/image';
import LayoutHeader from './LayoutHeader';
import { useAppSelector } from '@/store/hook';
import FeedIcon from '@mui/icons-material/Feed';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ForumIcon from '@mui/icons-material/Forum';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export const LayoutNav = ({ children }: { children: React.ReactNode }) => {
  const [isClosedSlideBar, setIsClosedSlideBar] = useState<boolean>(true);
  const userData = useAppSelector((state) => state.authSlice.auth);

  const [listFeature, setListFeature] = React.useState([
    {
      id: 'newsfeed',
      name: 'Newsfeed',
      icon: <FeedIcon />,
      selected: true,
      component: <></>,
    },
    {
      id: 'members',
      name: 'Members',
      icon: <GroupAddIcon />,
      selected: false,
      component: <></>,
    },
    {
      id: 'groups',
      name: 'Groups',
      icon: <GroupAddIcon />,
      selected: false,
      component: <></>,
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: <ForumIcon />,
      selected: false,
      component: <></>,
    },
    {
      id: 'shop',
      name: 'Shop',
      icon: <ShoppingBasketIcon />,
      selected: false,
      component: <></>,
    },
  ]);
  const handleSelectedListFeature = (value: any) => {
    setListFeature(
      listFeature.map((item) => {
        return {
          ...item,
          selected: item.id === value,
        };
      })
    );
  };
  const handleChangeSlideBar = () => {
    setIsClosedSlideBar(!isClosedSlideBar);
  };

  return (
    <div className="flex  h-full w-full ">
      {/* Left Content Side Bar */}

      <div
        className={`${
          isClosedSlideBar ? 'w-[288px]' : 'w-[100px]'
        }  min-h-[1200px]  p-2 shadow-mango-shadow-1  `}
        style={{ transition: '0.2s ease-in' }}
      >
        <Button
          variant="text"
          onClick={handleChangeSlideBar}
          className="mb-6 flex h-[80px] w-full cursor-pointer rounded-[5px] !bg-white px-[10px] py-[15px] shadow-md"
        >
          {isClosedSlideBar && (
            <>
              {userData ? (
                <Avatar
                  alt="Remy Sharp"
                  src={''}
                  sx={{ width: 50, height: 50 }}
                  className="mr-3"
                />
              ) : (
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  animation="wave"
                />
              )}
              <div className="my-auto mr-2 gap-1 flex flex-col  text-left text-[18px] normal-case font-extrabold  leading-[18px] text-mango-text-black-1">
                <p>{userData?.user?.username || ''}</p>
                <p className="text-sm font-light">
                  {userData?.user?.email || ''}
                </p>
              </div>
            </>
          )}
          {!isClosedSlideBar ? (
            <ArrowBackIosNewIcon />
          ) : (
            <ArrowForwardIosIcon />
          )}
        </Button>
        {/* List Feature */}
        {listFeature.map((item) => (
          <Button
            variant="text"
            onClick={() => handleSelectedListFeature(item.id)}
            sx={{
              mt: 2,
            }}
            className={`${
              item.selected
                ? ' bg-primary-main bg-opacity-20 !text-primary-main '
                : ' text-mango-text-gray-2 hover:!bg-[#00BED630]'
            } ${
              isClosedSlideBar && 'justify-start'
            } flex h-14 w-full cursor-pointer rounded-[5px] p-2`}
            key={item.id}
          >
            <div>{item.icon}</div>
            {isClosedSlideBar && (
              <span
                className={`ml-2 truncate text-[16px] font-bold capitalize ${
                  item.selected && 'text-mango-primary-blue'
                }`}
              >
                {item.name}
              </span>
            )}
          </Button>
        ))}
      </div>
      {/* Right Content  */}
      <div className="  w-full  bg-white px-12 py-2">
        {/* {listFeature.find((feature) => feature.selected)?.component} */}
        {/* <LayoutHeader /> */}
        {children}
        <p>1</p>
      </div>
    </div>
  );
};
