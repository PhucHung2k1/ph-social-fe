import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useEffect } from 'react';
import LayoutMain from '@/components/layouts/LayoutMain';
import { getDiscoverPosts } from '@/store/discover/discoverAction';
import PostThumb from '@/components/Discover/PostThumb';
import { getPostsRedux } from '@/store/post/postSlice';

export default function DiscoverScreen() {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const discoverRedux = useAppSelector((state) => state.discoverSlice);

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
    <LayoutMain>
      <div className=" bg-main-home min-h-screen px-5">
        <PostThumb
          posts={homePost.posts.filter(
            (item: any) => item.user._id !== auth.user._id
          )}
          result={homePost.result}
        />
      </div>
    </LayoutMain>
  );
}
