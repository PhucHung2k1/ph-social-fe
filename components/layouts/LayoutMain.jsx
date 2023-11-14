import { refreshToken, registerLoginSocial } from '@/store/auth/authAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import HorizontalSplitOutlinedIcon from '@mui/icons-material/HorizontalSplitOutlined';
import { IconButton } from '@mui/material';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import DrawerNav from '../Common/DrawerNav';

import Header from '../Common/Header';
import Nav from '../Common/Nav';
import { getSocketRedux } from '@/store/socket/socketSlice';
import SocketClient from '../SocketClient';
import { getNotifies } from '@/store/notify/notifyAction';
var connectionOptions = {
  transports: ['websocket'],
};
// const socket = io.connect(
//   process.env.NEXT_PUBLIC_API_BASE_URL_DEV,
//   connectionOptions
// );

function LayoutMain({ children }) {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const socket = useAppSelector((state) => state.socketSlice.socket);

  const { data: session } = useSession();
  const isChangeRedux = useAppSelector((state) => state.userSlice.isChange);
  const [expanded, setExpanded] = useState(true);
  const [isClosedSlideBar, setIsClosedSlideBar] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const savedRefreshToken = Cookies.get('refreshtoken');

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (savedRefreshToken) {
      dispatch(refreshToken(savedRefreshToken)).then((res) => {});
    }
  }, [dispatch, savedRefreshToken]);

  // useEffect(() => {

  // }, [dispatch]);

  const router = useRouter();

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const firstLogin = localStorage.getItem('firstLogin');
      if (!firstLogin && !session?.user) {
        router.push('/login');
      }
    }
  }, [router, session?.user]);

  useEffect(() => {
    if (Object.keys(auth).length === 0 && session?.user) {
      const body = {
        email: session?.user?.email || '',
        username: session?.user?.name || '',
        image: session?.user?.image || session?.user?.picture,
      };
      dispatch(registerLoginSocial(body)).then((res) => {
        if (res?.payload?.refresh_token) {
          dispatch(refreshToken(res?.payload?.refresh_token));
        }
      });
    }
  }, [auth, dispatch, session?.user]);

  useEffect(() => {
    const socket = io.connect('http://localhost:5000', connectionOptions);
    dispatch(getSocketRedux(socket));
    return () => socket.close();
  }, [dispatch]);

  // useEffect(() => {
  //   let isDispatched = false;

  //   const timeoutId = setTimeout(() => {
  //     if (!isDispatched && auth?.token) {
  //       dispatch(getPosts(auth.token));
  //       dispatch(getSuggestion(auth.token));
  //       isDispatched = true;
  //     }
  //   }, 200);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [dispatch, auth?.token, isChangeRedux]);

  useEffect(() => {
    if (auth?.token) {
      dispatch(getNotifies(auth?.token));
    }
  }, [auth?.token, dispatch, isChangeRedux]);

  const toggleNav = () => {
    setExpanded(!expanded);
    setOpenDrawer(!openDrawer);
  };
  return (
    <div>
      <Header />
      <div className="flex">
        {/* {router.pathname === '/' && ( */}
        <>
          <div className="hidden lg:block">
            <Nav
              isClosedSlideBar={isClosedSlideBar}
              setIsClosedSlideBar={setIsClosedSlideBar}
            />
          </div>
          <div
            className="lg:hidden fixed left-[70px] top-[15px] "
            onClick={toggleNav}
          >
            <IconButton>
              <HorizontalSplitOutlinedIcon />
            </IconButton>
            <DrawerNav
              openDrawer={openDrawer}
              handleDrawerClose={handleDrawerClose}
            />
          </div>
        </>

        <div
          className={`flex flex-col mt-[85px] flex-1 p-0 transition-all  ${
            isClosedSlideBar ? 'lg:ml-72' : 'lg:ml-28'
          } `}
        >
          {/* Nội dung có thể cuộn */}
          {children}
          {auth?.token && <SocketClient />}
          {/* <button
            onClick={() => {
              socket?.emit('joinUser', auth?.user?._id);
            }}
          >
            aaaaa
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default LayoutMain;
