import { IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { likePost, unLikePost } from '@/store/post/postAction';
import { likeComment, unLikeComment } from '@/store/comment/commentAction';
interface LikeButtonCommentProps {
  isLike: boolean;
  setIsLike: any;
  comment: any;
  post: PostData;
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

const LikeButtonComment: React.FC<LikeButtonCommentProps> = ({
  isLike,
  setIsLike,
  comment,
  post,
}) => {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const socket = useAppSelector((state) => state.socketSlice.socket);

  const dispatch = useAppDispatch();
  const handleLike = async () => {
    setIsLike(true);
    await dispatch(likeComment({ comment, post, auth, socket }));
    // await dispatch(likePost({ post, auth }));
  };
  const handleUnLike = async () => {
    setIsLike(false);
    await dispatch(unLikeComment({ comment, post, auth, socket }));
    // await dispatch(unLikePost({ post, auth }));
  };

  useEffect(() => {
    if (comment?.likes?.find((item: any) => item._id === auth?.user?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [auth?.user?._id, comment?.likes, post.likes, setIsLike]);

  return (
    <div>
      {!isLike ? (
        <IconButton onClick={handleLike}>
          <FavoriteBorderOutlinedIcon
            fontSize="small"
            className="text-[15px]"
          />
        </IconButton>
      ) : (
        <IconButton onClick={handleUnLike}>
          <FavoriteOutlinedIcon
            fontSize="small"
            style={{ color: 'red' }}
            className="text-[15px]"
          />
        </IconButton>
      )}
    </div>
  );
};

export default LikeButtonComment;
