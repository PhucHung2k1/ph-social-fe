/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from '@/store/hook';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { createComment } from '@/store/comment/commentAction';
import { BASE_URL } from '@/utils/config';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Carousel from 'react-material-ui-carousel';
import ShareModal from '../Common/ShareModal';
import LikeButton from '../HomePage/LikeButton';
import ModalEditPost from '../HomePage/ModalEditPost';
import CommentItem from './CommentItem';
import { PostData } from './PostItem';
import { savePost, unSavePost } from '@/store/post/postAction';
const Item = (props: any) => {
  return (
    <>
      {!props.item.url.includes('mp4') ? (
        <Paper>
          <img
            src={props.item.url}
            alt="none image"
            className="w-full h-[468px]"
          ></img>
        </Paper>
      ) : (
        <div className="w-[90%] flex items-center justify-center ">
          <video controls className="h-[468px]">
            <source src={props?.item?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
};
interface ModalBigPostItemProps {
  open: any;
  setOpen: any;
  item: PostData;

  isLike: any;
  setIsLike: any;
  handleLike: any;
  handleUnLike: any;
}

const ModalBigPostItem: React.FC<ModalBigPostItemProps> = ({
  open,
  setOpen,
  item,
  isLike,
  setIsLike,
  handleLike,
  handleUnLike,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
  const [anchorElCmt, setAnchorElCmt] = React.useState<any | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [saved, setSaved] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [replyComments, setReplyComments] = useState<any[]>([]);
  const handleClickCmt = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCmt(event.currentTarget);
  };
  const openMenu = Boolean(anchorEl);
  const openMenuCmt = Boolean(anchorElCmt);
  const [readMore, setReadMore] = useState(false);
  const router = useRouter();
  const [typeCmt, setTypeCmt] = useState('');
  const [arrCmtFilter, setArrCmtFilter] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
  };

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
    navigator.clipboard.writeText(`${BASE_URL}/post/${item._id}`);
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
    const newRep = item?.comments?.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [item?.comments]);
  useEffect(() => {
    if (auth?.user?.saved?.find((id: any) => id === item?._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth?.user?.saved, item?._id]);

  return (
    <>
      <ModalEditPost open={openModal} setOpen={setOpenModal} item={item} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className=" lg:w-[800px] w-[90vw] max-h-[700px] overflow-y-scroll"
        >
          <div className="flex relative items-center justify-center ">
            <div className="text-lg  flex items-center justify-center pb-2 font-semibold border-b border-gray-300 w-full">
              {item?.user?.username}'s Post
            </div>
            <div
              className="absolute right-[-10px] top-[-10px] text-sm "
              onClick={handleClose}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
            </div>
          </div>

          <div className="header py-2 flex items-center justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                router.push(`/profile/${item?.user?._id}`);
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={item?.user?.avatar || ''}
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
                      {!item?.isActivity && 'feeling'}{' '}
                      {item?.feelingStatus || ''}
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
                  <MenuItem
                    onClick={() => handleEditPost(item)}
                    className="h-10"
                  >
                    <EditOutlinedIcon className="mr-2" /> Edit Post
                  </MenuItem>
                  <MenuItem onClick={handleClose} className="h-10">
                    <DeleteOutlineIcon className="mr-2" /> Delete Post
                  </MenuItem>
                </div>
              )}

              {/* <MenuItem onClick={handleCopyLink} className="h-10">
                <CopyAllIcon className="mr-2" /> Copy Link
              </MenuItem> */}
            </Menu>
          </div>
          <div className="content">
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
                  {item?.images.map((item, i) => (
                    <Item key={i} item={item} />
                  ))}
                </Carousel>
              </div>
            </>
          )}
          <div className="like comment py-3 flex items-center justify-between text-sm">
            <div className="cursor-pointer"> {item?.likes?.length} likes</div>
            <div className="cursor-pointer">
              {item?.comments?.length || 0} comments
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

          <div className="display cmt ">
            <div
              className="w-full flex items-center justify-end px-0 text-sm py-2 cursor-pointer text-gray-800"
              onClick={handleClickCmt}
            >
              Most relevant <ArrowDropDownIcon />
              {/* <Menu
                id="fade-menu-comment"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorElCmt}
                open={openMenuCmt}
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
                <>
                  <MenuItem
                    onClick={() => {
                      setTypeCmt('most');
                      // const filterMost = item?.comments.filter((item)=> item.)
                    }}
                    className="h-10 w-72"
                  >
                    <div className="">Most Relevant</div>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="h-10 w-72 flex flex-col items-start"
                  >
                    <div className="">Newest</div>
                  </MenuItem>
                  <MenuItem onClick={handleClose} className="h-10 w-72">
                    <div className="">All Comments</div>
                  </MenuItem>
                </>
              </Menu> */}
            </div>
            {item?.comments
              ?.filter((itemFilter) => !itemFilter.reply)
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
                  />
                );
              })}
          </div>
          <div className="input-comment  flex items-center gap-2">
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
                className=" pt-2 bg-main-home min-h-10 resize-verstical h-10 !w-full border-none outline-none text-sm "
                placeholder="Write a comment..."
                rows={1}
              />
              <button
                className=" text-sm text-blue-600 font-semibold"
                type="submit"
              >
                Post
              </button>
            </form>
          </div>
          {isShare && <ShareModal url={`${BASE_URL}/post/${item._id}`} />}
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(ModalBigPostItem);
