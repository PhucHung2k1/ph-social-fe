import Image from 'next/image';
import React, { useEffect } from 'react';
import { Paper, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { useAppDispatch } from '@/store/hook';
import styles from '../../styles/Home.module.css';
import PrevLoader from '../Loading/PreLoader';
export interface LayoutAuthenProps {
  children: React.ReactNode;
  type?: string;
  titlePage?: string;
}

export default function LayoutAuthen({
  children,
  type,
  titlePage = '',
}: LayoutAuthenProps) {
  const { data } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const firstLogin = localStorage.getItem('firstLogin');
      if (firstLogin) {
        router.push('/');
      }
    }
  }, [router]);
  const socialAction = (action: string) => {
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          alert('Invalid credentials!');
        }

        if (callback?.ok) {
          //   router.push('/conversations')
          router.push('/');
          showToastMessage(dispatch, 'Logged In!', 'success');
        }
      })
      .finally(() => {});
  };

  return (
    <>
      {/* <Head>
        <title>
          {titlePage} {titlePage && '|'} PH Social
        </title>
        <link rel="icon" href="/images/logo-main.svg" />
      </Head> */}

      <div className="flex items-center justify-center h-screen">
        <div
          className={`hidden lg:flex lg:flex-col gap-5 w-1/2 ${styles.bgGradient} h-full items-center justify-center `}
        >
          <Image
            src="/images/Authentication/banner1.webp"
            alt="aa"
            width={570}
            height={300}
            priority={true}
          />
          <h4 className=" text-xl   font-bold text-white">
            Welcome To PHSocial
          </h4>
          <p className="font-medium text-white text-center w-[50%]">
            People can connect with others in the same area, families, friends,
            and those with the same interests
          </p>
        </div>
        <div className="w-full lg:w-1/2  overflow-auto bg-white flex flex-col items-center justify-between">
          <div className="w-[80%] flex flex-col items-center ">
            {/* <PrevLoader /> */}
            <div className="flex flex-col items-center justify-center  w-[550px]">
              <>
                <div className="flex h-[80px] w-[80px] gap-2 items-center justify-center rounded-3xl ">
                  <Image
                    src="/images/logo-main.svg"
                    alt="fbIcon"
                    width={18}
                    height={18}
                    className="w-[60%] cursor-pointer"
                  />
                  <h4 className=" text-3xl   font-bold text-[#262626]">
                    PHSocial
                  </h4>
                </div>
                <h4 className=" text-sm text-center w-[70%]  text-text-light-gray">
                  {type === 'login'
                    ? '   Welcome to PHSocial, please login to connect with people'
                    : type === 'register'
                    ? '   Welcome to PHSocial, please register aaccount to connect with people'
                    : ''}
                </h4>
              </>

              <div className="mt-10 w-[100%] flex flex-col gap-5 flex-1">
                {children}
              </div>
            </div>
          </div>

          {type === 'login' && (
            <div className="flex flex-col items-center justify-center fixed bottom-5">
              <p className="text-sm font-normal text-[#505050]">
                Or login with
              </p>
              <div className="flex items-center justify-center gap-5 mt-2">
                <div
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]"
                  onClick={() => socialAction('google')}
                >
                  <Image
                    src="/images/Authentication/icongoogle.svg"
                    alt="fbIcon"
                    width={20}
                    height={20}
                    className="w-[60%] cursor-pointer"
                  />
                </div>
                <div
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]"
                  onClick={() => socialAction('github')}
                >
                  <Image
                    src="/images/Authentication/icongithub.svg"
                    alt="fbIcon"
                    width={23}
                    height={16}
                    className="w-[60%] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
