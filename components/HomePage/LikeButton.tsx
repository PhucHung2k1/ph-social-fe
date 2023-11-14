import { useAppDispatch, useAppSelector } from '@/store/hook';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { IconButton } from '@mui/material';
import React, { useEffect } from 'react';
interface LikeButtonProps {
  isLike: boolean;
  setIsLike: any;
  post: PostData;
  handleUnLike: any;
  handleLike: any;
}
interface UserData {
  avatar: string;
  username: string;
  fullname: string;
  _id: string;
}
export interface PostData {
  comments: any[];
  content: string;
  createdAt: string;
  images: any[];
  likes: any[];
  updatedAt: string;
  user: UserData;
  __v: number;
  _id: string;
  feelingImage: string;
  feelingStatus: string;
  isActivity: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  isLike,
  post,
  setIsLike,
  handleUnLike,
  handleLike,
}) => {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      post?.likes?.length > 0 &&
      post?.likes?.find((item) => item._id === auth?.user?._id)
    ) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [auth?.user?._id, post?.likes, setIsLike]);

  return (
    <div>
      {!isLike ? (
        <IconButton onClick={handleLike}>
          <FavoriteBorderOutlinedIcon fontSize="medium" />
        </IconButton>
      ) : (
        <IconButton onClick={handleUnLike}>
          <FavoriteOutlinedIcon fontSize="medium" style={{ color: 'red' }} />
        </IconButton>
      )}
    </div>
  );
};

export default LikeButton;
