import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import ModalBigPostItem from '../Posts/ModalBigPostItem';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { likePost, unLikePost } from '@/store/post/postAction';
import { PostData } from '../HomePage/LikeButton';
import PostItemThumb from './PostItemThumb';
interface PostThumbProps {
  posts: any[];
  result: any;
}
const PostThumb: React.FC<PostThumbProps> = ({ posts, result }) => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<PostData | any>();
  const socket = useAppSelector((state) => state.socketSlice.socket);
  const auth = useAppSelector((state) => state.authSlice.auth);
  const dispatch = useAppDispatch();
  const [openModalBig, setOpenModalBig] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    console.log(selectedItem);

    setIsLike(true);
    dispatch(likePost({ post: selectedItem, auth, socket }));
  };
  const handleUnLike = () => {
    setIsLike(false);
    dispatch(unLikePost({ post: selectedItem, auth, socket }));
  };
  if (result === 0)
    return (
      <h2 className="h-screen text-center text-danger text-xl flex items-center justify-center">
        No Post
      </h2>
    );
  return (
    <>
      <div className="post_thumb">
        {posts
          ?.filter((item1) => item1?.images?.length > 0)
          .map((post): any => (
            <div key={post._id}>
              <PostItemThumb post={post} />
            </div>
          ))}
      </div>
      <ModalBigPostItem
        open={openModalBig}
        setOpen={setOpenModalBig}
        item={selectedItem}
        isLike={isLike}
        setIsLike={setIsLike}
        handleLike={handleLike}
        handleUnLike={handleUnLike}
      />
    </>
  );
};

export default PostThumb;
