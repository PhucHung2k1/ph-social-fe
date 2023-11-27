import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import CallIcon from '@mui/icons-material/Call';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
interface Props {
  user: any;
  border?: string;
  handleCloseAll?: () => void;
  children?: any;
  link?: any;
  msg?: boolean;
}

function UserCard({
  user,
  border,
  handleCloseAll,
  children,
  link = true,
  msg,
}: Props) {
  console.log('🚀 ~ file: UserCard.tsx:26 ~ user:', user);
  const { t } = useTranslation();

  const showMsg = (user: any) => {
    return (
      <>
        <div>{user.text}</div>
        {user.media.length > 0 && (
          <div>
            {user.media.length} <BrokenImageIcon />
          </div>
        )}

        {user.call && (
          <span className="material-icons">
            {user.call.times === 0 ? (
              user.call.video ? (
                <VideocamOffIcon />
              ) : (
                <PhoneDisabledIcon />
              )
            ) : user.call.video ? (
              <VideoCameraFrontIcon />
            ) : (
              <CallIcon />
            )}
          </span>
        )}
      </>
    );
  };
  return (
    <>
      {!user ? (
        // <Skeleton
        //   variant="rounded"
        //   width={147}
        //   height={20}
        //   animation="wave"
        //   className="ml-2"
        // />
        <div></div>
      ) : (
        <div
          className={`flex p-2 items-center justify-between w-full cursor-pointer ${border} hover:bg-gray-200`}
        >
          <div>
            {link ? (
              <Link
                href={`/profile/${user?._id}`}
                className="flex items-center"
                onClick={handleCloseAll}
              >
                <Avatar
                  src={user.avatar}
                  alt="Remy Sharp"
                  sx={{ width: 50, height: 50 }}
                  className="mr-3"
                />
                <div className="ml-1 ">
                  <span className="block">{user.username}</span>
                  <span className="block text-xs ">{user.fullname}</span>

                  {/* <span className="text-[13px] font-semibold text-green-500">
                    {t('active')}
                  </span> */}
                </div>
              </Link>
            ) : (
              <div className="flex items-center" onClick={handleCloseAll}>
                <Avatar
                  src={user.avatar}
                  alt="Remy Sharp"
                  sx={{ width: 50, height: 50 }}
                  className="mr-3"
                />
                <div className="ml-1 ">
                  <span className="block">{user.username}</span>
                  <small className="opacity-70">
                    {user.text !== '' ? (
                      user.text
                    ) : (
                      <ImageIcon
                        style={{ color: 'red' }}
                        className="cursor-pointer"
                      />
                    )}
                  </small>
                </div>
              </div>
            )}
          </div>
          {children}
        </div>
      )}
    </>
  );
}
export default UserCard;
