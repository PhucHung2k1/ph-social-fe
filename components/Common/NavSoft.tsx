import ExploreIcon from '@mui/icons-material/Explore';
import FeedIcon from '@mui/icons-material/Feed';
import ForumIcon from '@mui/icons-material/Forum';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { PayPalButton } from 'react-paypal-button-v2';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { useRouter as routerLink } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BootstrapDialog } from '../Posts/PostItem';
import { updateVipUserHandle } from '@/store/user/userAction';
import { showToastMessage } from '@/utils/helper/showToastMessage';
interface NavProps {
  isClosedSlideBar: boolean;
  setIsClosedSlideBar: any;
}
const paypalOptions = {
  clientId:
    'AYr_TRftw--yMftF62GNnhXACya5ES85JHXrB96yt1OM7hTZwHpcYhCDQ_7sQNE8T93OdNTHKPSy3I24', // Thay thế bằng ID của bạn
  disableFunding: 'credit,card', // Ẩn thẻ ghi nợ hoặc tín dụng
};

const NavSoft: React.FC<NavProps> = ({
  isClosedSlideBar,
  setIsClosedSlideBar,
}) => {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: session }: any = useSession();
  const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
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
    {
      id: 'PH-GPT',
      name: 'PH-GPT',
      icon: <PsychologyAltIcon />,
      selected: false,
      component: <></>,
      href: '/ph-gpt',
      handleClick: () => {
        if (auth?.user?.role !== 'vip') {
          setOpenModalDeletePost(true);
        } else {
          router.push(`/ph-gpt`);
        }
      },
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
  const handleCloseModalDeletePost = () => {
    setOpenModalDeletePost(false);
    console.log('auth', auth);
  };

  return (
    <nav
      className={`fixed  top-[71px] left-0 h-full shadow
      } bg-white p-4 transition-all`}
    >
      <BootstrapDialog
        onClose={handleCloseModalDeletePost}
        aria-labelledby="customized-dialog-title"
        open={openModalDeletePost}
      >
        <div className="text-center text-xl font-semibold py-3">
          {t('updateVipUser')}
        </div>

        <IconButton
          aria-label="close"
          onClick={handleCloseModalDeletePost}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>{t('areYouUpdateVipUser')}</Typography>
        </DialogContent>
        <DialogActions className="flex items-center">
          <Button
            variant="contained"
            className="!mt-[-7px] mr-2 w-[100px]  rounded-lg bg-white !font-semibold !text-black hover:bg-white normal-case "
            onClick={handleCloseModalDeletePost}
          >
            Cancel
          </Button>
          {/* <Button
            variant="contained"
            className="!mt-3 mr-2  w-[100px] rounded-lg bg-mango-primary-blue !font-semibold !text-white normal-case "
            sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
            onClick={handleConfirmDeletePost}
          >
            Delete
          </Button> */}
          {/* <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{
                color: 'blue',
                layout: 'horizontal',
                label: 'pay',
                height: 35,
              }}
              createOrder={async () => {
                const res = await fetch(`/api/checkout`, {
                  method: 'POST',
                });
               
                const order = await res.json();
                console.log(order);
                return order.id;
              }}
            />
          </PayPalScriptProvider> */}
          <PayPalButton
            amount="10.00"
            options={paypalOptions}
            onSuccess={(details: any, data: any) => {
              showToastMessage(
                dispatch,
                `Update Role User Successful`,
                'success'
              );

              handleCloseModalDeletePost();

              dispatch(updateVipUserHandle({ auth }));

              window.location.reload();
            }}
          />
        </DialogActions>
      </BootstrapDialog>
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
                  if (item?.handleClick) {
                    item.handleClick();
                  } else {
                    handleSelectedListFeature(item.id);
                    router.push(item.href);
                  }
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
