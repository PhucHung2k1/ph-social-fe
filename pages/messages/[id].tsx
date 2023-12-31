import LeftSide from '@/components/Message/LeftSide';
import RightSide from '@/components/Message/RightSide';
import LayoutMainSoftNav from '@/components/layouts/LayoutMainSoftNav';
import { getDiscoverPosts } from '@/store/discover/discoverAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getPostsRedux } from '@/store/post/postSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function Conversation() {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const discoverRedux = useAppSelector((state) => state.discoverSlice);
  const router = useRouter();

  const homePost = useAppSelector((state) => state.homePost);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth?.token) {
      dispatch(getDiscoverPosts({ token: auth?.token }));
    }
  }, [auth?.token, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(getPostsRedux(discoverRedux));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [discoverRedux, dispatch]);

  return (
    <LayoutMainSoftNav>
      <div className="message grid grid-cols-12">
        <div className="md:col-span-3 md:block hidden overflow-y-scroll h-[100%]">
          <LeftSide />
        </div>
        <div className="md:col-span-9 col-span-12 px-0 border-l  border-gray-300  h-full ">
          <RightSide />
        </div>
      </div>
    </LayoutMainSoftNav>
  );
}
