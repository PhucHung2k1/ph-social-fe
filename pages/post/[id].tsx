/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from '@/store/hook';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import dynamic from 'next/dynamic';

const ModalEditPost = dynamic(
  () => import('@/components/HomePage/ModalEditPost')
);
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import ShareModal from '@/components/Common/ShareModal';
import LikeButton from '@/components/HomePage/LikeButton';
import CommentItem from '@/components/Posts/CommentItem';
import ModalUserLikes from '@/components/User/ModalUserLikes';
import LayoutMain from '@/components/layouts/LayoutMain';
import { createComment } from '@/store/comment/commentAction';
import { styled } from '@mui/material/styles';
import {
  deletePost,
  getPosts,
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from '@/store/post/postAction';
import { BASE_FE, BASE_URL } from '@/utils/config';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Carousel from 'react-material-ui-carousel';
import Icons from '@/components/Icon';
import { useTranslation } from 'react-i18next';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const Item = (props: any) => {
  return (
    <>
      {!props.item.url.includes('mp4') ? (
        <Paper>
          <img
            src={props.item.url}
            alt="none image"
            className="w-full h-[568px]"
          ></img>
        </Paper>
      ) : (
        <div className="w-[90%] flex items-center justify-center ">
          <video controls className="h-[568px]">
            <source src={props?.item?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
};
interface ModalBigPostItemProps {}

const ModalBigPostItem: React.FC<ModalBigPostItemProps> = ({}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [item, setItem] = useState<any>();
  const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
  const homePost = useAppSelector((state) => state.homePost);
  const [openModalLike, setOpenModalLike] = useState(false);
  const [anchorElCmt, setAnchorElCmt] = React.useState<any | HTMLElement>(null);
  const { id } = router.query;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    const data: any =
      homePost?.posts &&
      homePost?.posts?.find((item1: any) => item1._id === id);

    if (data) {
      setItem(data);
    }
  }, [homePost?.posts, id, router]);
  const { t, i18n } = useTranslation();

  const [saved, setSaved] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [replyComments, setReplyComments] = useState<any[]>([]);
  const handleClickCmt = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCmt(event.currentTarget);
  };
  const handleLike = () => {
    setIsLike(true);
    dispatch(likePost({ post: item, auth, socket }));
  };
  const openMenu = Boolean(anchorEl);

  const [readMore, setReadMore] = useState(false);
  const handleUnLike = () => {
    setIsLike(false);
    dispatch(unLikePost({ post: item, auth, socket }));
  };
  const isChangeRedux = useAppSelector((state) => state.userSlice.isChange);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.socketSlice.socket);
  const auth = useAppSelector((state: any) => state.authSlice.auth);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_FE}/post/${item._id}`);
    handleClose();
  };
  const handleCloseCmt = () => {
    setOpen(false);
  };
  const handleEditPost = (item: any) => {
    setOpenModal(true);
    setAnchorEl(false);
  };
  const handleComment = (values: any) => {
    if (values?.comment.trim() === '') return;

    setValue('comment', '');

    const newComment = {
      content: values?.comment,
      likes: [],
      user: auth?.user,
      createdAt: new Date().toISOString(),
    };

    dispatch(createComment(item, newComment, auth, socket));
  };
  useEffect(() => {
    const newRep = item?.comments?.filter((cm: any) => cm.reply);
    setReplyComments(newRep);
  }, [item?.comments]);
  useEffect(() => {
    if (auth?.user?.saved?.find((id: any) => id === item?._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth?.user?.saved, item?._id]);
  const arrUserNameLikes = item?.likes?.map((item: any) => {
    if (item?.username === auth?.user?.username) {
      return 'You' + '\n';
    }

    return item.username + '\n';
  });
  useEffect(() => {
    let isDispatched = false;

    const timeoutId = setTimeout(() => {
      if (!isDispatched && auth?.token) {
        dispatch(getPosts(auth.token));

        isDispatched = true;
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, auth?.token, isChangeRedux]);
  const handleDeletePost = (item: any) => {
    setAnchorEl(false);
    setOpenModalDeletePost(true);
  };
  const handleCloseModalDeletePost = () => {
    setOpenModalDeletePost(false);
  };
  const handleConfirmDeletePost = async () => {
    await dispatch(deletePost({ post: item, auth, socket }));
    handleCloseModalDeletePost();
    router.push('/');
  };
  return (
    <LayoutMain>
      <ModalEditPost open={openModal} setOpen={setOpenModal} item={item} />
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

      <Box className=" rounded-lg bg-gray-100 shadow-lg my-12  lg:mx-48 sm:mx-4">
        <div className="flex relative items-center justify-center ">
          {!item ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={40}
              className="mb-4"
            />
          ) : (
            <>
              {i18n.language === 'vi' ? (
                <div className="text-lg py-4  flex items-center justify-center pb-2 font-semibold border-b border-gray-300 w-full">
                  Bài viết của {item?.user?.username}
                </div>
              ) : (
                <div className="text-lg py-4  flex items-center justify-center pb-2 font-semibold border-b border-gray-300 w-full">
                  {item?.user?.username}' Post
                </div>
              )}
            </>
          )}
        </div>

        <div className="header py-2 px-8 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              router.push(`/profile/${item?.user?._id}`);
            }}
          >
            {!item ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={44}
                height={44}
                className="mr-3"
              />
            ) : (
              <Avatar
                alt="Remy Sharp"
                src={item?.user?.avatar || ''}
                sx={{ width: 44, height: 44 }}
                className="mr-3 cursor-pointer"
              />
            )}

            <div className="flex flex-col">
              <div className="text-base flex items-center gap-1 font-semibold">
                {!item ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={200}
                    height={15}
                    className="mr-3"
                  />
                ) : (
                  item?.user?.username
                )}

                {item && item?.feelingImage !== '' && (
                  <div className="font-normal text-sm flex">
                    is
                    <Avatar
                      alt="Remy Sharp"
                      src={item?.feelingImage || ''}
                      sx={{ width: 20, height: 20 }}
                      className="mx-1 cursor-pointer"
                    />
                    {!item?.isActivity ? 'feeling' : ''}{' '}
                    {item?.feelingStatus || ''}
                  </div>
                )}
              </div>
              {!item ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={200}
                  height={15}
                  className="mr-3"
                />
              ) : (
                <div className="text-sm text-gray-600">
                  {moment(item?.createdAt).fromNow()}
                </div>
              )}
            </div>
          </div>
          {item?.user?._id === auth?.user?._id && (
            <div
              id="fade-button"
              onClick={handleClick}
              className="cursor-pointer"
            >
              {!item ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={15}
                  height={15}
                  className="mr-3"
                />
              ) : (
                <MoreHorizIcon />
              )}
            </div>
          )}

          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={openMenu}
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
              </div>
            )}

            <MenuItem onClick={handleCopyLink} className="h-10">
              <CopyAllIcon className="mr-2" /> {t('copyPost')}
            </MenuItem>
          </Menu>
        </div>
        {!item ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={300}
            height={15}
            className=" mx-8 "
          />
        ) : (
          <div className="content px-8 ">
            {item?.content?.length < 200
              ? item?.content
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
        )}
        {!item ? (
          <Skeleton variant="rectangular" width="100%" className="mt-4">
            <div style={{ paddingTop: '40%' }} />
          </Skeleton>
        ) : (
          <>
            {item?.images?.length > 0 && (
              <>
                <div className="body mt-2">
                  <Carousel
                    autoPlay={false}
                    indicators={item?.images?.length > 1 ? true : false}
                    navButtonsAlwaysVisible
                    navButtonsAlwaysInvisible={
                      item?.images?.length > 1 ? false : true
                    }
                  >
                    {item?.images.map((item: any, i: any) => (
                      <Item key={i} item={item} />
                    ))}
                  </Carousel>
                </div>
              </>
            )}
          </>
        )}

        {!item ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={40}
            className="mb-4"
          />
        ) : (
          <div className="like comment py-3  px-8  flex items-center justify-between text-sm">
            {arrUserNameLikes?.length > 0 ? (
              <Tooltip
                title={
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {arrUserNameLikes}
                  </div>
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
                  {' '}
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
                {' '}
                {item?.likes?.length} likes
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
        )}
        {!item ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={40}
            className="mb-4"
          />
        ) : (
          <div className="footer flex items-center justify-between px-4 border-b border-t border-gray-300">
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
          </div>
        )}

        {!item ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={40}
            className="mb-4"
          />
        ) : (
          <div className="display cmt px-8 border-b border-gray-400">
            <div
              className="w-full flex items-center justify-end px-0 text-sm py-2 cursor-pointer text-gray-800"
              onClick={handleClickCmt}
            ></div>
            {item?.comments
              ?.filter((itemFilter: any) => !itemFilter.reply)
              .map((item1: any, index: any) => {
                return (
                  <CommentItem
                    key={index}
                    comment={item1}
                    post={item}
                    commentId={item1._id}
                    repCm={replyComments?.filter(
                      (item) => item.reply === item1._id
                    )}
                  />
                );
              })}
          </div>
        )}
        {!item ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={40}
            className="mb-4"
          />
        ) : (
          <>
            <div className="input-comment px-8 py-4  flex items-center gap-2">
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
                  {...register('comment', {})}
                  className=" pt-2 bg-main-home min-h-10 resize-vertical h-10 !w-full border-none outline-none text-sm "
                  placeholder={`${t('writeAComment')}`}
                  rows={1}
                />
                <div className="flex items-center justify-center mt-6">
                  <div className="flex-1"></div>
                  <Icons setContent={setContent} content={content} top={true} />
                </div>
                <button
                  className=" text-sm text-blue-600 font-semibold"
                  type="submit"
                >
                  {t('post')}
                </button>
              </form>
            </div>
            {isShare && <ShareModal url={`${BASE_FE}/post/${item._id}`} />}
          </>
        )}
      </Box>
    </LayoutMain>
  );
};

export default React.memo(ModalBigPostItem);
