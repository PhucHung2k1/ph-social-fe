import { useAppSelector } from '@/store/hook';
import React from 'react';
import PostItem from '../Posts/PostItem';
import { Skeleton } from '@mui/material';

const Posts = () => {
  const homePost = useAppSelector((state) => state.homePost);

  const showPosts = homePost?.posts?.map((item) => {});
  const auth = useAppSelector((state) => state.authSlice.auth);
  const isShowLoading = useAppSelector((state) => state.loadingSlice.isLoading);

  return (
    <>
      {isShowLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="shadow my-2 py-3 bg-white rounded-lg flex flex-col gap-2"
          >
            <div className="header py-2 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton
                  variant="circular"
                  width={44}
                  height={44}
                  animation="wave"
                />
                <div className="flex flex-col">
                  <Skeleton
                    variant="text"
                    width={120}
                    height={20}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    height={16}
                    animation="wave"
                  />
                </div>
              </div>
              <div id="fade-button" className="cursor-pointer">
                <Skeleton
                  variant="circular"
                  width={30}
                  height={20}
                  animation="wave"
                />
              </div>
            </div>
            <div className="content pb-2 px-4">
              <Skeleton variant="text" width="80%" animation="wave" />
              <Skeleton variant="text" width="60%" animation="wave" />
            </div>
            <div className="body">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                animation="wave"
              />
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-1">
                <Skeleton variant="text" width="20px" animation="wave" />
                <Skeleton variant="text" width="20px" animation="wave" />
                <Skeleton variant="text" width="20px" animation="wave" />
              </div>
              <div>
                <Skeleton variant="text" width="20px" animation="wave" />
              </div>
            </div>
          </div>
        ))}
      <div className="min-h-[215px]   flex flex-col">
        {auth.token && homePost && homePost?.result === 0 ? (
          <div className="w-full h-[215px] flex items-center justify-center mt-3 bg-white rounded-lg first-line: text-gray-700 font-semibold text-xl">
            No Post
          </div>
        ) : (
          homePost?.posts?.map((item, index) => {
            return <PostItem key={index} item={item} />;
          })
        )}
      </div>
    </>
  );
};

export default Posts;
