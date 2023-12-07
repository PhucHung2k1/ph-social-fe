/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { logout } from '@/store/user/userAction';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
import { sendMsgToOpenAI } from '@/lib/openai';
import { refreshToken, registerLoginSocial } from '@/store/auth/authAction';
const GPTPage = () => {
  const [input, setInput] = useState('');
  const msgEnd = useRef<any>(null);
  const [messages, setMessages] = useState([
    {
      text: 'Hi, I am PH-GPT, a state-of-the-art language model developed by ChatGPT',
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chat = 'flex items-start gap-4 m-4 p-8';
  const chatBot =
    'flex items-start gap-4 bg-[rgba(28,41,77,1)] w-fit rounded-lg p-8';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [anchorElAvatar, setAnchorElAvatar] = useState<any>(null);
  const { t } = useTranslation();
  const auth = useAppSelector((state) => state.authSlice.auth);

  const { data: session }: { data: any } = useSession();

  const handleSignOut = () => {
    Cookies.remove('auth-token');
    Cookies.remove('refresh-token');
    if (session?.user) {
      signOut({
        redirect: true,
      });
      Cookies.remove('refreshtoken');
      dispatch(logout());
    } else {
      router.push('/login');
      Cookies.remove('refreshtoken');
      dispatch(logout());
    }
    router.push('/login');
  };
  const handleSend = async () => {
    setLoading(true);
    const text = input;
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
    ]);
    const res = await sendMsgToOpenAI(text);

    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
      { text: res, isBot: true },
    ]);
    setLoading(false);
    setInput('');
  };

  const handleQuery = async (e: any) => {
    setLoading(true);
    const text = e.target.value;
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
    ]);
    const res = await sendMsgToOpenAI(text);

    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
      { text: res, isBot: true },
    ]);
    setLoading(false);
    setInput('');
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const body = {
      email: session?.user?.email || '',
      username: session?.user?.name || '',
      image: session?.user?.image || session?.user?.picture,
    };
    dispatch(registerLoginSocial(body)).then((res: any) => {
      if (res?.payload?.refresh_token) {
        dispatch(refreshToken(res?.payload?.refresh_token));
      }
    });
  }, [dispatch, session?.user]);

  return (
    <div className="app bg-[rgb(3,0,31)] text-white min-h-screen grid grid-cols-12">
      <div className="sidebar border-r col-span-3 border-[rgb(100,100,100)]">
        <div className="upperSide p-4 border-b border-[rgb(100,100,100)] h-[70%]">
          <div className="upperSideTop flex items-center p-4">
            <img src="/images/GPT/chatgpt.svg" alt="" className="mr-4" />
            <span className="brand text-2xl font-semibold">PH-GPT</span>
          </div>
          <button
            className="midBtn bg-[#00ADC3] border-none text-white p-3 text-sm w-full rounded-lg mb-8 flex items-center justify-center"
            onClick={() => {
              if (window !== undefined) {
                window.location.reload();
              }
            }}
          >
            <img
              src="/images/GPT/add-30.png"
              alt="addBtn"
              className="h-8 pr-4"
            />
            New Chat
          </button>
          <div className="upperSideBottom flex flex-col gap-4">
            <button
              className="query flex gap-4 items-center p-6 w-full rounded-lg border border-[rgb(98,98,98,1)]"
              value={'What is Programming?'}
              onClick={handleQuery}
            >
              <img src="/images/GPT/message.svg" alt="" />
              What is programming?
            </button>
            <button
              className="query flex gap-4 items-center p-6 w-full rounded-lg border border-[rgb(98,98,98,1)]"
              value={'How to use an API?'}
              onClick={handleQuery}
            >
              <img src="/images/GPT/message.svg" alt="" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide p-4 flex flex-col gap-4">
          <div className="flex item-center gap-4">
            <Avatar
              alt="Remy Sharp"
              src={auth?.user?.avatar}
              sx={{ width: 50, height: 50 }}
              className="mr-3 cursor-pointer"
            />
            <div className="text-center text-lg mt-2">
              {auth?.user?.fullname}
            </div>
          </div>
          <Button
            variant="contained"
            className="py-2 my-2 w-full rounded-lg bg-mango-primary-blue !font-semibold !text-white "
            type="submit"
            sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
            startIcon={<HomeIcon />}
            onClick={() => {
              router.push('/');
            }}
          >
            Back to home
          </Button>

          <Button
            variant="contained"
            className="py-2 my-2 w-full rounded-lg bg-mango-primary-blue !font-semibold !text-white "
            type="submit"
            sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
            startIcon={<LogoutIcon />}
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="main col-span-9  flex flex-col items-center m-8">
        <div className="chats overflow-hidden overflow-y-scroll w-full max-w-[70rem] ">
          {messages.map((message, index) => {
            return (
              <div
                className={message.isBot ? chatBot : chat + 'flex items-center'}
                key={index}
              >
                {message.isBot ? (
                  <img
                    src="/images/GPT/chatgptLogo.svg"
                    alt=""
                    className="object-cover w-14 mr-4 rounded-lg"
                  />
                ) : (
                  <img
                    src={auth?.user?.avatar}
                    alt=""
                    className="object-cover w-14 mr-4 rounded-lg"
                  />
                )}
                <p className="txt ">{message.text}</p>
              </div>
            );
          })}
          <div ref={msgEnd}></div>
        </div>
        <div className="chatFooter mt-auto w-full flex flex-col items-center justify-center">
          <div className="inp p-2 bg-[rgba(28,30,58,1)] flex items-center rounded-lg w-[80%]">
            <input
              type="
            "
              placeholder="Send a message"
              className="w-full outline-none text-white p-2 bg-transparent"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {loading ? (
              <CircularProgress className="h-24 w-24" />
            ) : (
              <button className="send" onClick={handleSend}>
                <img src="/images/GPT/send.svg" alt="" />
              </button>
            )}
          </div>
          <p className="mt-2 font-thin">
            PH-GPT may produce inaccurate information about people, places, or
            facts. PH-GPT August 20 version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GPTPage;
