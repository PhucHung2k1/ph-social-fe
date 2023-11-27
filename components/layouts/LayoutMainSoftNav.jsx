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
import '../../i18n/i18n';
import { getNotifies } from '@/store/notify/notifyAction';
import { getSocketRedux } from '@/store/socket/socketSlice';
import Header from '../Common/Header';
import NavSoft from '../Common/NavSoft';
import SocketClient from '../SocketClient';
import CallModal from '../Message/CallModal';
import { setPeerRedux } from '@/store/peer/peerSlice';
var connectionOptions = {
  transports: ['websocket'],
};

function LayoutMainSoftNav({ children }) {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const call = useAppSelector((state) => state.callSlice.call);
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

  useEffect(() => {
    import('peerjs').then(({ default: Peer }) => {
      const newPeer = new Peer(undefined, {
        path: '/',
        secure: true,
      });

      dispatch(setPeerRedux(newPeer));
    });
  }, [dispatch]);

  const toggleNav = () => {
    setExpanded(!expanded);
    setOpenDrawer(!openDrawer);
  };
  return (
    <div>
      <Header />
      <div className="flex">
        <>
          <div className="hidden lg:block">
            <NavSoft
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
          className={`flex flex-col mt-[75px] flex-1 p-0 transition-all  overflow-y-scroll
            lg:ml-24
          } `}
        >
          {children}
          {auth?.token && <SocketClient />}
          {call && <CallModal />}
        </div>
      </div>
    </div>
  );
}

export default LayoutMainSoftNav;
