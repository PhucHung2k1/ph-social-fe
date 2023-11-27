/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from '@/store/hook';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostData } from '../HomePage/LikeButton';
import dynamic from 'next/dynamic';

const ModalEditPost = dynamic(() => import('../HomePage/ModalEditPost'));
interface PostItemThumbProps {
  post: PostData;
}

const PostItemThumb: React.FC<PostItemThumbProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const auth = useAppSelector((state) => state.authSlice.auth);
  const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);

  const [openModal, setOpenModal] = useState(false);

  const socket = useAppSelector((state) => state.socketSlice.socket);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const arrUserNameLikes = post?.likes?.map((item: any) => {
    if (item?.username === auth?.user?.username) {
      return 'You' + '\n';
    }

    return item.username + '\n';
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  // useEffect(() => {
  //   const newRep = post?.comments?.filter((cm) => cm.reply);
  //   setReplyComments(newRep);
  // }, [post?.comments]);
  return (
    <>
      {/* <ModalBigPostItem
        open={openModalBig}
        setOpen={setOpenModalBig}
        item={post}
        isLike={isLike}
        setIsLike={setIsLike}
        handleLike={handleLike}
        handleUnLike={handleUnLike}
      /> */}
      <ModalEditPost open={openModal} setOpen={setOpenModal} item={post} />
      <div>
        <div
          className="post_thumb_display"
          onClick={() => {
            // setOpenModalBig(true);
            router.push(`/post/${post?._id}`);
          }}
        >
          {post?.images?.[0]?.url?.match(/video/i) ? (
            <video controls>
              <source src={post?.images?.[0]?.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <Image
                src={post?.images?.[0]?.url}
                alt={post?.images?.[0]?.url}
                height={300}
                width={300}
              />
            </>
          )}

          <div className="post_thumb_menu flex gap-4 px-12">
            <div className="flex text-white gap-2">
              <FavoriteIcon style={{ color: 'white' }} /> {post.likes.length}
            </div>
            <div className="flex gap-2 text-white">
              <ChatBubbleIcon style={{ color: 'white' }} />
              {post.comments.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItemThumb;
