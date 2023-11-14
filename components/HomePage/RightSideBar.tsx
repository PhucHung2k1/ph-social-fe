import React from 'react';
import UserCard from '../User/UserCard';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import FollowBtn from '../Common/FollowBtn';
import HomePaginate from '@/hooks/HomePaginate';

const RightSideBar = () => {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const suggestionUser = useAppSelector((state) => state.suggestionSlice.user);

  const dispatch = useAppDispatch();
  return (
    <>
      {auth?.user && (
        <div>
          <UserCard user={auth.user} />

          <div className="flex justify-between items-center my-2">
            <h5 className="text-gray-500 ml-2 ">Suggestion for you</h5>
          </div>
          {suggestionUser?.length > 0 && (
            <div>
              {suggestionUser.map((item: any, index: any) => {
                return (
                  <UserCard user={item} key={index}>
                    <FollowBtn user={item} small={true} />
                  </UserCard>
                );
              })}
            </div>
          )}
          <div style={{ opacity: 0.5 }} className="my-2 flex flex-col">
            {/* <HomePaginate />/ */}
            <small className="d-block">Welcome to PH SOCIAL NETWORK</small>

            <small>&copy; 2023 PH SOCIAL NETWORK FROM LPH</small>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSideBar;
