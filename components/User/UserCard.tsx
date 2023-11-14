import { Avatar, Skeleton } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Props {
  user: any;
  border?: string;
  handleCloseAll?: () => void;
  children?: any;
}

function UserCard({ user, border, handleCloseAll, children }: Props) {
  return (
    <>
      {!user ? (
        // <Skeleton
        //   variant="rounded"
        //   width={147}
        //   height={20}
        //   animation="wave"
        //   className="ml-2"
        // />
        <div></div>
      ) : (
        <div
          className={`flex p-2 items-center justify-between w-full ${border} hover:bg-gray-200`}
        >
          <div>
            <Link
              href={`/profile/${user?._id}`}
              className="flex items-center"
              onClick={handleCloseAll}
            >
              <Avatar
                src={user.avatar}
                alt="Remy Sharp"
                sx={{ width: 50, height: 50 }}
                className="mr-3"
              />
              <div className="ml-1 ">
                <span className="block">{user.username}</span>
                <small className="opacity-70">{user.fullname}</small>
              </div>
            </Link>
          </div>
          {children}
        </div>
      )}
    </>
  );
}
export default UserCard;
