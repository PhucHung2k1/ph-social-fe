import { User } from '@/store/auth/authSlice';
import {
  createComment,
  deleteComment,
  updateComment,
} from '@/store/comment/commentAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton, Menu, MenuItem, Skeleton } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LikeButtonComment from './LikeButtonComment';
import { PostData } from './PostItem';
import Icons from '../Icon';
import { useTranslation } from 'react-i18next';

interface CommentProps {
  content: string;
  createdAt: string;
  likes: Array<any>;
  postId: string;
  updatedAt: string;
  user: User;
  _id: string;
  tag: any;
}

interface CommentItemCardProps {
  comment: CommentProps;
  post: PostData;
  commentId: any;
  repCm?: any;
  children?: any;
  setShowAllReply?: any;
  isLoadingHandleComment?: boolean;
}

const CommentItemCard: React.FC<CommentItemCardProps> = ({
  comment,
  post,
  commentId,
  repCm,
  children,
  setShowAllReply,
  isLoadingHandleComment,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setFocus,
    setValue,
  } = useForm<any>();

  const [readMore, setReadMore] = useState(false);
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [contentRep, setContentRep] = useState('');
  const [onReply, setOnReply] = useState<any>(false);
  const [dataReply, setDataReply] = useState<any>({});
  const socket = useAppSelector((state) => state.socketSlice.socket);
  const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const auth = useAppSelector((state) => state.authSlice.auth);
  const router = useRouter();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const handleEditComment = (item: any) => {
    handleClose();
    setFocus('comment');
    setOnEdit(true);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUpdateComment = (values: any) => {
    if (comment?.content !== content) {
      dispatch(
        updateComment({
          comment: comment,
          post,
          content,
          auth,
          socket,
        })
      );
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Trigger the form submission or any other action you want
      handleSubmit(handleReplyComment)();
    }
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply(true);

    setDataReply({ ...comment, commentId });
    setShowAllReply(true);
  };
  const handleReplyComment = (values: any) => {
    if (contentRep.trim() === '') {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContentRep('');

    const newComment = {
      content: contentRep,
      likes: [],
      user: auth?.user,
      createdAt: new Date().toISOString(),
      reply: onReply && dataReply?.commentId,
      tag: onReply && dataReply?.user,
    };

    dispatch(createComment(post, newComment, auth, socket));
    setOnReply(false);
    if (setOnReply) return setOnReply(false);
  };

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    setContent(comment?.content);
  }, [comment?.content]);

  return (
    <>
      {comment?._id && (
        <div className="flex flex-col gap-2">
          <div className="flex items-start">
            <div
              onClick={() => {
                router.push(`/profile/${comment?.user?._id}`);
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={comment.user?.avatar || ''}
                sx={{ width: 32, height: 32 }}
                className=" cursor-pointer"
              />
            </div>

            <form
              onSubmit={handleSubmit(handleUpdateComment)}
              className="w-full flex justify-center px-2 rounded-xl  gap-2"
            >
              <div className="flex flex-col gap-2 w-full text-sm">
                <div className="flex items-center">
                  <div className="bg-main-home rounded-xl py-2 px-3 w-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="font-semibold">
                          {comment?.user?.username}
                        </div>
                        {onEdit ? (
                          <div className="flex items-start">
                            {comment?.tag?.username && (
                              <div className="text-blue-600 text-sm mt-[8px]">
                                @{comment?.tag?.username}
                              </div>
                            )}
                            <textarea
                              // {...register('comment', {})}
                              value={content}
                              className=" pt-2 bg-main-home min-h-10 resize-verstical !w-full border-none outline-none text-sm "
                              placeholder={`${t('writeAComment')}`}
                              rows={5}
                              defaultValue={comment?.content}
                              autoFocus
                              onChange={(e: any) => setContent(e.target.value)}
                            />
                            <div className="flex items-center justify-center mt-6">
                              <div className="flex-1"></div>
                              <Icons
                                setContent={setContent}
                                content={content}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            {comment?.tag && (
                              <div className="text-blue-600 text-sm ">
                                @{comment?.tag?.username}
                              </div>
                            )}

                            <div>
                              {comment?.content?.length < 100
                                ? comment?.content
                                : readMore
                                ? comment?.content + ' '
                                : comment?.content?.slice(0, 100) + '....'}
                              {comment?.content?.length > 100 && (
                                <span
                                  className="text-sm font-semibold cursor-pointer"
                                  onClick={() => setReadMore(!readMore)}
                                >
                                  {readMore ? 'Hide content' : 'Read more'}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <LikeButtonComment
                          isLike={isLike}
                          setIsLike={setIsLike}
                          comment={comment}
                          post={post}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {(post?.user?._id === auth?.user?._id ||
                      comment?.user?._id === auth?.user?._id) && (
                      <>
                        <IconButton
                          id="fade-button"
                          onClick={handleClick}
                          className="cursor-pointer mr-[-10px]"
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
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
                              filter:
                                'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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
                          transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                          }}
                          anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                          }}
                        >
                          {post?.user?._id === auth.user._id ? (
                            comment?.user?._id === auth.user._id ? (
                              <div>
                                <MenuItem
                                  onClick={() => handleEditComment(comment)}
                                  className="h-10 w-44"
                                >
                                  {t('edit')}
                                </MenuItem>
                                <MenuItem
                                  onClick={handleRemove}
                                  className="h-10"
                                >
                                  {t('delete')}
                                </MenuItem>
                              </div>
                            ) : (
                              <MenuItem onClick={handleRemove} className="h-10">
                                {t('delete')}
                              </MenuItem>
                            )
                          ) : (
                            comment?.user?._id === auth.user._id && (
                              <div>
                                <MenuItem
                                  onClick={() => handleEditComment(comment)}
                                  className="h-10 w-44"
                                >
                                  {t('edit')}
                                </MenuItem>
                                <MenuItem
                                  onClick={handleRemove}
                                  className="h-10"
                                >
                                  {t('delete')}
                                </MenuItem>
                              </div>
                            )
                          )}
                        </Menu>
                      </>
                    )}
                  </div>
                </div>

                {isLoadingHandleComment ? (
                  <div className="flex gap-2 px-3 text-xs cursor-pointer">
                    <div className="text-text-gray-bold font-semibold">
                      Posting...
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 px-3 text-xs cursor-pointer">
                    <div className="text-text-gray-bold font-semibold">
                      {comment?.likes?.length} {t('likes')}
                    </div>
                    <div
                      className="text-text-gray-bold font-semibold"
                      onClick={handleReply}
                    >
                      {!onReply ? `${t('reply')}` : `${t('cancel')}`}
                    </div>
                    {onEdit && (
                      <>
                        <button
                          className="font-semibold text-blue-600"
                          type="submit"
                        >
                          update
                        </button>
                        <button
                          className="font-semibold text-blue-600"
                          onClick={() => {
                            setOnEdit(false);
                          }}
                        >
                          cancel
                        </button>
                      </>
                    )}

                    <div className="">
                      {moment(comment?.createdAt).fromNow()}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
          <>{children}</>

          <div>
            {onReply && (
              <div className="input-comment pl-8 mb-4  flex items-center gap-2">
                <div
                  onClick={() => {
                    router.push(`/profile/${auth?.user?._id}`);
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={auth?.user?.avatar || ''}
                    sx={{ width: 32, height: 32 }}
                    className=" cursor-pointer"
                  />
                </div>

                <form
                  onSubmit={handleSubmit(handleReplyComment)}
                  className="w-full flex justify-center items-center  bg-main-home px-2 rounded-xl  gap-2"
                >
                  <div className="text-blue-600 text-sm">
                    @{dataReply?.user?.username}
                  </div>
                  <textarea
                    // {...register('replyData', {})}
                    value={contentRep}
                    onChange={(e: any) => setContentRep(e.target.value)}
                    className=" pt-3 bg-main-home min-h-10 resize-vertical h-10 !w-full border-none outline-none text-sm "
                    placeholder="Write a reply..."
                    rows={1}
                  />
                  <Icons setContent={setContentRep} content={contentRep} />
                  <button
                    className=" text-sm text-blue-600 font-semibold"
                    type="submit"
                  >
                    {t('post')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(CommentItemCard);
