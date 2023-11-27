/* eslint-disable @next/next/no-img-element */
import { createComment } from '@/store/comment/commentAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import CopyAllIcon from '@mui/icons-material/CopyAll';

import {
  deletePost,
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from '@/store/post/postAction';
import { BASE_FE, BASE_URL } from '@/utils/config';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Carousel from 'react-material-ui-carousel';
import ShareModal from '../Common/ShareModal';
import LikeButton from '../HomePage/LikeButton';
import ModalEditPost from '../HomePage/ModalEditPost';
import CommentItem from './CommentItem';
import ModalBigPostItem from './ModalBigPostItem';
import ModalUserLikes from '../User/ModalUserLikes';
import Icons from '../Icon';
import { useTranslation } from 'react-i18next';

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

interface PostItemProps {
  item: PostData;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const PostItem: React.FC<PostItemProps> = ({ item }) => {
  const itemRef = useRef<any>(item);
  const { t } = useTranslation();
  const [openModalLike, setOpenModalLike] = useState(false);
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.socketSlice.socket);
  const [replyComments, setReplyComments] = useState<any[]>([]);
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);
  const auth = useAppSelector((state) => state.authSlice.auth);
  const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [readMore, setReadMore] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
  const [content, setContent] = useState('');
  const [isLoadingHandleComment, setIsLoadingHandleComment] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const arrUserNameLikes = item?.likes?.map((item) => {
    if (item?.username === auth?.user?.username) {
      return 'You' + '\n';
    }

    return item.username + '\n';
  });
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_FE}/post/${item._id}`);
    handleClose();
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
          router.push(`/post/${item._id}`);
        }}
        className="w-100 "
      >
        {!props?.item?.url?.includes('mp4') ? (
          <Paper>
            <img
              src={props.item.url}
              alt="none image"
              className="w-full h-[568px]"
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
    setOpenModal(true);
    setAnchorEl(false);
  };
  const handleDeletePost = (item: any) => {
    setAnchorEl(false);
    setOpenModalDeletePost(true);
  };

  const handleComment = (values: any) => {
    // if (values?.comment.trim() === '') return;

    // setValue('comment', '');

    const newComment = {
      content: content,
      likes: [],
      user: auth?.user,
      createdAt: new Date().toISOString(),
      // reply: onReply && dataReply?.commentId,
      // tag: onReply && dataReply?.user,
    };

    dispatch(createComment(item, newComment, auth, socket)).then((res: any) => {
      if (res) {
        setContent('');
      }
    });
    setContent('');
  };

  const handleLike = async () => {
    setIsLike(true);
    await dispatch(likePost({ post: item, auth, socket }));
  };
  const handleUnLike = async () => {
    setIsLike(false);
    await dispatch(unLikePost({ post: item, auth, socket }));
  };
  const handleConfirmDeletePost = async () => {
    await dispatch(deletePost({ post: item, auth, socket }));
    handleCloseModalDeletePost();
  };
  useEffect(() => {
    const newRep = item?.comments?.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [item.comments]);
  useEffect(() => {
    if (auth?.user?.saved?.find((id) => id === item._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, item._id]);

  return (
    <>
      {/* <ModalBigPostItem
        open={openModalBig}
        setOpen={setOpenModalBig}
        item={item}
        isLike={isLike}
        setIsLike={setIsLike}
        handleLike={handleLike}
        handleUnLike={handleUnLike}
      /> */}
      <BootstrapDialog
        onClose={handleCloseModalDeletePost}
        aria-labelledby="customized-dialog-title"
        open={openModalDeletePost}
      >
        <div className="text-center text-xl font-semibold py-3">
          Delete Post?
        </div>

        <IconButton
          aria-label="close"
          onClick={handleCloseModalDeletePost}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Items in your trash will be automatically deleted after 30 days. You
            can delete them from your trash earlier by going to activity log in
            settings.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="!mt-3 mr-2 w-[100px]  rounded-lg bg-white !font-semibold !text-black hover:bg-white normal-case "
            onClick={handleCloseModalDeletePost}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="!mt-3 mr-2  w-[100px] rounded-lg bg-mango-primary-blue !font-semibold !text-white normal-case "
            sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
            onClick={handleConfirmDeletePost}
          >
            Delete
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <ModalEditPost open={openModal} setOpen={setOpenModal} item={item} />
      <div className="shadow my-2 py-3 bg-white rounded-lg flex flex-col gap-2">
        <div className="header py-2 px-4 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              router.push(`/profile/${item?.user?._id}`);
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={item?.user?.avatar || item?.images[0]?.url}
              sx={{ width: 44, height: 44 }}
              className="mr-3 cursor-pointer"
            />
            <div className="flex flex-col">
              <div className="text-base flex items-center gap-1 font-semibold">
                {item?.user?.username}
                {item?.feelingImage !== '' && (
                  <div className="font-normal text-sm flex">
                    is
                    <Avatar
                      alt="Remy Sharp"
                      src={item?.feelingImage || ''}
                      sx={{ width: 20, height: 20 }}
                      className="mx-1 cursor-pointer"
                    />
                    {!item?.isActivity && 'feeling'} {item?.feelingStatus || ''}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {moment(item?.createdAt).fromNow()}
              </div>
            </div>
          </div>
          {item?.user?._id === auth?.user?._id && (
            <div
              id="fade-button"
              onClick={handleClick}
              className="cursor-pointer"
            >
              <MoreHorizIcon />
            </div>
          )}
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {item?.user?._id === auth?.user?._id && (
              <div>
                <MenuItem onClick={() => handleEditPost(item)} className="h-10">
                  <EditOutlinedIcon className="mr-2" /> {t('editPost')}
                </MenuItem>
                <MenuItem
                  onClick={() => handleDeletePost(item)}
                  className="h-10"
                >
                  <DeleteOutlineIcon className="mr-2" /> {t('deletePost')}
                </MenuItem>
                <MenuItem onClick={handleCopyLink} className="h-10">
                  <CopyAllIcon className="mr-2" /> {t('copyPost')}
                </MenuItem>
              </div>
            )}
          </Menu>
        </div>
        <div className="content  px-4">
          {item?.content?.length < 200
            ? item.content
            : readMore
            ? item?.content + ''
            : item?.content?.slice(0, 200) + '...'}
          {item?.content?.length > 60 && (
            <span
              className="cursor-pointer text-blue-500"
              onClick={() => {
                setReadMore(!readMore);
              }}
            >
              {readMore ? ' Hide Content' : ' Read More'}
            </span>
          )}
        </div>

        {item?.images?.length > 0 && (
          <>
            <div className="body">
              <Carousel
                autoPlay={false}
                indicators={item?.images?.length > 1 ? true : false}
                navButtonsAlwaysVisible
                navButtonsAlwaysInvisible={
                  item?.images?.length > 1 ? false : true
                }
              >
                {item?.images.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </Carousel>
            </div>
          </>
        )}
        <div className="like comment px-4 flex items-center justify-between text-sm">
          {arrUserNameLikes?.length > 0 ? (
            <Tooltip
              title={
                <div style={{ whiteSpace: 'pre-line' }}>{arrUserNameLikes}</div>
              }
              placement="top"
              className="cursor-pointer"
            >
              <div
                className="cursor-pointer"
                onClick={() => {
                  setOpenModalLike(true);
                }}
              >
                {item?.likes?.length} {t('likes')}
              </div>
            </Tooltip>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpenModalLike(true);
              }}
            >
              {item?.likes?.length} {t('likes')}
            </div>
          )}
          <ModalUserLikes
            users={item?.likes}
            open={openModalLike}
            setOpen={setOpenModalLike}
          />

          <div className="cursor-pointer">
            {item?.comments?.length || 0} {t('comments')}
          </div>
        </div>
        <div className="footer flex items-center justify-between px-2 border-b border-t border-gray-300">
          <div className="flex items-center gap-1">
            <LikeButton
              isLike={isLike}
              post={item}
              setIsLike={setIsLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />
            <IconButton>
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
            <IconButton>
              <ShareOutlinedIcon onClick={() => setIsShare(!isShare)} />
            </IconButton>
          </div>
          {item?.user?._id !== auth?.user?._id && (
            <div>
              {saved ? (
                <IconButton
                  onClick={() => {
                    dispatch(unSavePost({ post: item, auth }));
                  }}
                >
                  <BookmarkIcon style={{ color: 'black' }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    dispatch(savePost({ post: item, auth }));
                  }}
                >
                  <BookmarkBorderOutlinedIcon />
                </IconButton>
              )}
            </div>
          )}
        </div>

        <div className="display cmt px-4">
          {item?.comments?.filter((item1) => !item1.reply).length > 2 && (
            <div
              className="text-gray-700 text-[15px] pb-2 cursor-pointer font-semibold"
              onClick={() => {
                router.push(`/post/${item?._id}`);
                // setOpenModalBig(true);
              }}
            >
              {t('viewMoreComments')}
            </div>
          )}
          {item?.comments
            ?.filter((itemFilter) => !itemFilter?.reply)
            .slice(-2)
            .map((item1, index) => {
              return (
                <CommentItem
                  key={index}
                  comment={item1}
                  post={item}
                  commentId={item1._id}
                  repCm={replyComments?.filter(
                    (item) => item.reply === item1._id
                  )}
                  isLoadingHandleComment={isLoadingHandleComment}
                ></CommentItem>
              );
            })}
        </div>
        <div className="input-comment px-4 mt-[-8px] flex items-center gap-2">
          {/* cmt */}

          <Avatar
            alt="Remy Sharp"
            src={auth?.user?.avatar || ''}
            sx={{ width: 32, height: 32 }}
            className=" cursor-pointer"
          />
          <form
            onSubmit={handleSubmit(handleComment)}
            className="w-full flex justify-center bg-main-home px-2 rounded-xl  gap-2"
          >
            <textarea
              value={content}
              className=" pt-2 bg-main-home min-h-10 resize-vertical h-10 !w-full border-none outline-none text-sm "
              placeholder={`${t('writeAComment')}`}
              rows={1}
              onChange={(e: any) => setContent(e.target.value)}
            />

            <div className="flex items-center justify-center">
              <div className="flex-1"></div>
              <Icons setContent={setContent} content={content} />
            </div>
            <button
              className=" text-sm text-blue-600 font-semibold"
              type="submit"
            >
              {t('post')}
            </button>
          </form>
        </div>
        {isShare && <ShareModal url={`${BASE_URL}/post/${item._id}`} />}
      </div>
    </>
  );
};

export default PostItem;
