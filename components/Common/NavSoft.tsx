import ExploreIcon from '@mui/icons-material/Explore';
import FeedIcon from '@mui/icons-material/Feed';
import ForumIcon from '@mui/icons-material/Forum';
import { useAppSelector } from '@/store/hook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Avatar, Button, Skeleton, Tooltip } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRouter as routerLink } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
interface NavProps {
  isClosedSlideBar: boolean;
  setIsClosedSlideBar: any;
}
const NavSoft: React.FC<NavProps> = ({
  isClosedSlideBar,
  setIsClosedSlideBar,
}) => {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const { t, i18n } = useTranslation();
  const { data: session }: any = useSession();

  const router = useRouter();
  const routerMain = routerLink();

  const [listFeature, setListFeature] = React.useState([
    {
      id: 'newsfeed',
      name: 'Newsfeed',
      icon: <FeedIcon />,
      selected: routerMain.asPath.replace('/', '') === '',
      component: <></>,
      href: '/',
    },
    {
      id: 'discover',
      name: 'Discover',
      icon: <ExploreIcon />,
      selected: routerMain.asPath.replace('/', '') === 'discover',
      component: <></>,
      href: '/discover',
    },
    // {
    //   id: 'groups',
    //   name: 'Groups',
    //   icon: <GroupAddIcon />,
    //   selected: false,
    //   component: <></>,
    //   href: '/group',
    // },
    {
      id: 'savedposts',
      name: 'Saved Posts',
      icon: <BookmarkAddedIcon />,
      selected: false,
      component: <></>,
      href: '/savedposts',
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: <ForumIcon />,
      selected: false,
      component: <></>,
      href: '/messages',
    },
  ]);
  useEffect(() => {
    setListFeature((prevListFeature) => {
      return prevListFeature.map((feature) => {
        return {
          ...feature,
          name: t(feature.id),
        };
      });
    });
  }, [i18n.language, t]);
  const handleSelectedListFeature = (value: any) => {
    setListFeature(
      listFeature.map((item) => {
        return {
          ...item,
          selected: item.id === value,
        };
      })
    );
  };

  return (
    <nav
      className={`fixed  top-[71px] left-0 h-full shadow
      } bg-white p-4 transition-all`}
    >
      <div
        className="cursor-pointer flex items-center justify-center"
        onClick={() => {
          router.push('/');
        }}
      >
        {auth?.user?.avatar ? (
          <Avatar
            alt="Remy Sharp"
            src={auth?.user?.avatar}
            sx={{ width: 50, height: 50 }}
          />
        ) : (
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation="wave"
          />
        )}
      </div>

      {!auth?.token
        ? Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={256}
              height={40}
              animation="wave"
              className="ml-0 mt-4"
            />
          ))
        : listFeature.map((item) => (
            <Tooltip title={t(item.name)} placement="right" key={item.id}>
              <Button
                variant="text"
                onClick={() => {
                  handleSelectedListFeature(item.id);
                  router.push(item.href);
                }}
                sx={{
                  mt: 2,
                }}
                className={`${
                  item.selected
                    ? ' !bg-primary-main !bg-opacity-30 !text-primary-main hover:bg-primary-main hover:!text-primary-main hover:bg-opacity-30'
                    : ' text-mango-text-gray-2 hover:!bg-[#00BED630]'
                }  flex h-14 w-full cursor-pointer rounded-[5px]`}
              >
                <div>{item.icon}</div>
              </Button>
            </Tooltip>
          ))}
    </nav>
  );
};

export default React.memo(NavSoft);
