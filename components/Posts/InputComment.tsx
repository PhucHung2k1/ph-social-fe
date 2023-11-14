import { createComment } from '@/store/comment/commentAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import React from 'react';
import { useForm } from 'react-hook-form';

interface InputCommentProps {
  comment: any;
  post: any;
  commentId: any;
  onReply: any;
  setOnReply: any;
}

const InputComment: React.FC<InputCommentProps> = ({
  comment,
  post,
  commentId,
  onReply,
  setOnReply,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();
  const auth = useAppSelector((state) => state.authSlice.auth);
  const socket = useAppSelector((state) => state.socketSlice.socket);
  const dispatch = useAppDispatch();
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
    console.log(newComment);

    dispatch(createComment(post, newComment, auth, socket));
  };
  return (
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
      <button className=" text-sm text-blue-600 font-semibold" type="submit">
        Post
      </button>
    </form>
  );
};

export default InputComment;
