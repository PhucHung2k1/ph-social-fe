import LayoutMain from '@/components/layouts/LayoutMain';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Avatar, Skeleton } from '@mui/material';
import Cookies from 'js-cookie';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
export default function LoginForm() {
  const { data: session }: { data: any } = useSession();
  const dispatch = useAppDispatch();
  const data = useSession();
  const auth = useAppSelector((state) => state.authSlice.auth);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn();
    }
  }, [session]);

  const handleSignOut = () => {
    Cookies.remove('auth-token');
    Cookies.remove('refresh-token');
    signOut({
      redirect: true,
    });
  };
  if (!auth?.user?.avatar) {
    return (
      <div>
        <Skeleton variant="circular" width={100} height={100} />
        <Skeleton variant="text" width={100} height={24} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </div>
    );
  }

  return (
    // <div className="h-screen ">
    //   <Image alt="avt" src={auth?.avatar} width={100} height={100} />
    //   <p>{auth?.username}</p>
    //   <button onClick={handleSignOut}>Logout</button>
    // </div>
    // <LayoutHeader>
    //   <LayoutNav>
    //     <div className="h-[10000px] overflow-y-auto bg-red-200"></div>
    //   </LayoutNav>
    // </LayoutHeader>
    <LayoutMain>
      <div className="min-h-screen bg-main-home">
        {/* Cover Photo */}
        <div
          className={` bg-center bg-cover h-[300px] `}
          style={{
            backgroundImage: `url(${auth?.user?.coverImage ?? ''})`,
          }}
        ></div>

        <div className=" flex items-center justify-center w-[100%]">
          <div className=" mt-[-100px] w-[80%] bg-white flex items-center justify-center h-[200px] rounded-xl">
            <div className=" bg-red-400 flex relative cursor-pointer">
              {auth ? (
                <Avatar
                  src={auth?.user?.avatar ?? ''}
                  alt="User Avatar"
                  className="!w-40 !h-40 border-4 border-white mt-[-180px]"
                ></Avatar>
              ) : (
                <Skeleton
                  variant="circular"
                  width={160}
                  height={160}
                  animation="wave"
                />
              )}

              <div className="flex h-[30px] absolute top-10 right-2 w-[30px] gap-0 items-center justify-center rounded-3xl bg-primary-main mt-[-100px]">
                <Image
                  src="/images/User/picture.svg"
                  alt="fbIcon"
                  width={18}
                  height={18}
                  className="w-[60%] cursor-pointer"
                />
              </div>
            </div>

            <div className="ml-4 text-white">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-xl">Software Engineer</p>
              {/* Add more profile information */}
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
