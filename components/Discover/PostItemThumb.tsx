/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useCallback, useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { PostData } from '../HomePage/LikeButton';
import { likePost, unLikePost } from '@/store/post/postAction';
import { createComment } from '@/store/comment/commentAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import { Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import ModalBigPostItem from '../Posts/ModalBigPostItem';
import ModalEditPost from '../HomePage/ModalEditPost';
interface PostItemThumbProps {
  post: PostData;
}

const PostItemThumb: React.FC<PostItemThumbProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [replyComments, setReplyComments] = useState<any[]>([]);
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);
  const auth = useAppSelector((state) => state.authSlice.auth);
  const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [readMore, setReadMore] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
  const [openModalBig, setOpenModalBig] = useState(false);
  const [isLoadingHandleComment, setIsLoadingHandleComment] = useState(false);
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
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseModalDeletePost = () => {
    setOpenModalDeletePost(false);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  const Item = (props: any) => {
    return (
      <div
        onClick={() => {
          setOpenModalBig(true);
        }}
      >
        {!props.item.url.includes('mp4') ? (
          <Paper>
            <img
              src={props.item.url}
              alt="none image"
              className="w-full h-[468px]"
            ></img>
          </Paper>
        ) : (
          <div className="w-[100%] flex items-center justify-center ">
            <video controls className="h-[468px]">
              <source src={props?.item?.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    );
  };
  const handleEditPost = (item: any) => {
    console.log(item);
    setOpenModal(true);
    setAnchorEl(false);
  };
  const handleDeletePost = (item: any) => {
    console.log(item);

    setAnchorEl(false);
    setOpenModalDeletePost(true);
  };

  const handleComment = (values: any) => {
    if (values?.comment.trim() === '') return;

    setValue('comment', '');

    const newComment = {
      content: values?.comment,
      likes: [],
      user: auth?.user,
      createdAt: new Date().toISOString(),
      // reply: onReply && dataReply?.commentId,
      // tag: onReply && dataReply?.user,
    };

    dispatch(createComment(post, newComment, auth, socket)).then((res) => {});
  };

  const handleLike = async () => {
    setIsLike(true);
    await dispatch(likePost({ post, auth, socket }));
  };
  const handleUnLike = async () => {
    setIsLike(false);
    await dispatch(unLikePost({ post, auth, socket }));
  };
  useEffect(() => {
    const newRep = post?.comments?.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post?.comments]);
  return (
    <>
      <ModalBigPostItem
        open={openModalBig}
        setOpen={setOpenModalBig}
        item={post}
        isLike={isLike}
        setIsLike={setIsLike}
        handleLike={handleLike}
        handleUnLike={handleUnLike}
      />
      <ModalEditPost open={openModal} setOpen={setOpenModal} item={post} />
      <div>
        <div
          className="post_thumb_display"
          onClick={() => {
            setOpenModalBig(true);
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
