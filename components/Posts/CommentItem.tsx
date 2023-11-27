import { User } from '@/store/auth/authSlice';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import React, { useState, useRef } from 'react';
import CommentItemCard from './CommentItemCard';
import { PostData } from './PostItem';
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

interface CommentItemProps {
  comment: CommentProps;
  post: PostData;
  commentId: any;
  repCm: any;
  children?: any;
  isLoadingHandleComment?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  post,
  repCm,
  isLoadingHandleComment,
}) => {
  const [showAllReply, setShowAllReply] = useState(false);
  const itemRef = useRef<any>(comment);
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col gap-2">
        <CommentItemCard
          comment={comment || itemRef}
          post={post}
          commentId={comment._id}
          setShowAllReply={setShowAllReply}
          isLoadingHandleComment={isLoadingHandleComment}
        >
          <div className="pl-8">
            {repCm?.length > 0 && (
              <>
                {!showAllReply ? (
                  <div
                    className="flex gap-2 px-4 text-sm cursor-pointer text-gray-600 font-semibold"
                    onClick={() => {
                      setShowAllReply(true);
                    }}
                  >
                    <SubdirectoryArrowRightIcon fontSize="small" />
                    {repCm?.length} {t('replies')}
                  </div>
                ) : (
                  <>
                    {repCm.map(
                      (item: any, index: any) =>
                        item.reply && (
                          <CommentItemCard
                            key={index}
                            comment={item}
                            post={post}
                            commentId={comment._id}
                            setShowAllReply={setShowAllReply}
                          />
                        )
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </CommentItemCard>
      </div>
    </>
  );
};

export default React.memo(CommentItem);
