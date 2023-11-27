import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useEffect } from 'react';
import LayoutMain from '@/components/layouts/LayoutMain';
import { getDiscoverPosts } from '@/store/discover/discoverAction';
import PostThumb from '@/components/Discover/PostThumb';
import { getPostsRedux } from '@/store/post/postSlice';
import { getSavedPosts } from '@/store/savedPosts/savedPostsAction';

export default function SavedPostScreen() {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const savedPostsRedux = useAppSelector((state) => state.savedPostsSlice);

  const homePost = useAppSelector((state) => state.homePost);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth?.token) {
      dispatch(getSavedPosts({ token: auth?.token })).then((res) => {
        if (res?.status === 200) {
          dispatch(getPostsRedux({ ...res?.data }));
        }
      });
    }
  }, [auth?.token, dispatch]);
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     dispatch(getPostsRedux(savedPostsRedux));
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [savedPostsRedux, dispatch]);

  return (
    <LayoutMain>
      <div className=" bg-main-home min-h-screen px-5">
        <PostThumb
          posts={homePost?.posts?.filter(
            (item: any) => item?.user?._id !== auth?.user?._id
          )}
          result={homePost?.result}
        />
      </div>
    </LayoutMain>
  );
}
