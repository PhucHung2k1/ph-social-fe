import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getDataAPI } from '@/utils/fetchData';
import { Clear, HomeOutlined, Search } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  styled,
} from '@mui/material';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce, useOnClickOutside } from 'usehooks-ts';
import UserCard from '../User/UserCard';

import { logout } from '@/store/user/userAction';
import { useTranslation } from 'react-i18next';
import NotifyModal from './NotifyModal';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
interface StyledTabProps {
  label: string;
  icon?: any;
  iconPosition?: any;
}

export const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(() => ({
  fontWeight: 500,
  color: '#9B9BA00',
  '&.Mui-selected': {
    color: '#00BED6',
    fontWeight: 700,
  },
}));

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    color: '#00BED6',
    backgroundColor: 'transparent',
  },

  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    color: '#00BED6',
    backgroundColor: '#00BED6',
  },
});
const items = [
  {
    id: 0,
    label: 'Home',
    key: 'team',

    children: <HomeOutlined />,
    href: '/',
  },

  // {
  //   id: 2,
  //   label: 'Video',
  //   key: 'payStructure',
  //   children: <OndemandVideoOutlined />,
  // },
  // {
  //   id: 3,
  //   label: 'Marketplace',
  //   key: 'serviceProduct',
  //   children: <StorefrontOutlined />,
  // },
  // {
  //   id: 4,
  //   label: 'Gaming',
  //   key: 'serviceProduct',
  //   children: <SportsEsportsOutlined />,
  // },
];

function Header() {
  const { data: session }: { data: any } = useSession();
  const { i18n } = useTranslation();

  const [anchorElAvatar, setAnchorElAvatar] = useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const notifies = useAppSelector((state: any) => state.notifySlice);

  const ref = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState<any>('en');
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<number>(0);

  const handleChangeActiveKey = (
    _event: React.SyntheticEvent,
    newValue: any
  ) => {
    setActiveKey(newValue);
    localStorage.setItem('selectedTab', newValue);
  };

  const [valueSearch, setValueSearch] = useState<any>('');
  const debouncedValue = useDebounce<string>(valueSearch, 500);

  const auth = useAppSelector((state) => state.authSlice.auth);

  const openAvatar = Boolean(anchorElAvatar);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseAvatar = () => {
    setAnchorElAvatar(null);
  };

  const handleClearInput = () => {
    setValueSearch('');
  };

  const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    router.push(`/profile/${auth?.user?._id}`);
  };

  useEffect(() => {
    const storedTabValue = localStorage.getItem('selectedTab');
    if (storedTabValue) {
      setTabValue(parseInt(storedTabValue));
    }
  }, []);
  const handleSignOut = () => {
    Cookies.remove('auth-token');
    Cookies.remove('refresh-token');
    if (session?.user) {
      signOut({
        redirect: true,
      });
      Cookies.remove('refreshtoken');
      dispatch(logout());
    } else {
      router.push('/login');
      Cookies.remove('refreshtoken');
      dispatch(logout());
    }
  };

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('lng', event.target.value);
  };
  useEffect(() => {
    const lng: any = localStorage.getItem('lng');
    setLanguage(lng || 'en');
    i18n.changeLanguage(lng || 'en');
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      setIsLoading(true);
      getDataAPI(`/search?username=${debouncedValue}`, '')
        .then((res) => {
          if (res.status === 200) {
            setUsers(
              res?.data?.users.filter(
                (item: any) => item.username !== auth?.user?.username
              )
            );
          }
        })
        .finally(() => setIsLoading(false));
    }
    if (debouncedValue.length == 0) {
      setUsers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, debouncedValue.length, session?.user?.username]);
  const handleClickOutside = () => {
    setValueSearch('');
  };

  const handleClickInside = () => {
    setValueSearch('');
  };
  const listRightTitle = [
    // {
    //   label: 'Friend Requests',
    //   icon: <Diversity1Outlined />,
    //   onClick: () => {},
    // },
    // {
    //   label: 'Messages',
    //   icon: <ForumOutlined />,
    //   onClick: () => {},
    // },
    // {
    //   label: 'Notifications',
    //   icon: <NotificationsActiveOutlined />,
    //   onClick: handleClickNoti,
    // },
  ];
  useOnClickOutside(ref, handleClickOutside);
  return (
    <Grid container spacing={2} className="!z-50">
      <div className="fixed top-0 left-0 w-full h-[70px]   px-5 flex items-center justify-between bg-white shadow !z-50">
        <div
          className="flex items-center ml-[-10px] w-[340px]"
          onClick={() => {
            router.push('/');
          }}
        >
          <div className="flex h-[60px] w-[60px] gap-0 items-center justify-center rounded-3xl cursor-pointer">
            <Image
              src="/images/logo-main.svg"
              alt="fbIcon"
              width={18}
              height={18}
              className="w-[60%] cursor-pointer"
            />
          </div>
          <h2 className="font-semibold text-2xl uppercase lg:block hidden cursor-pointer">
            PHSOCIAL
          </h2>
        </div>
        <div className="w-full flex items-center lg:justify-between justify-end">
          <div className="h-full hidden lg:block mt-2"></div>
          <div className=" h-full">
            <div className="flex justify-end gap-5 items-center h-full">
              <div className=" h-full ">
                <div className="flex h-full items-center justify-start relative">
                  <TextField
                    variant="outlined"
                    placeholder={`${t('search')}`}
                    InputProps={{
                      style: { height: '40px', border: 'none' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {valueSearch && (
                            <IconButton onClick={handleClearInput} edge="end">
                              <Clear />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    className=" w-[150px] sm:w-[260px] bg-gray-100 !border-none !outline-none "
                    value={valueSearch}
                    onChange={(e) => setValueSearch(e.target.value)}
                  />

                  {isLoading ? (
                    <div
                      className="w-full h-20 absolute top-12 bg-white shadow flex items-center justify-center"
                      onClick={handleClickInside}
                      ref={ref}
                    >
                      <CircularProgress className="h-24 w-24" />
                    </div>
                  ) : (
                    <div
                      className="absolute top-12  w-full bg-white shadow"
                      onClick={handleClickInside}
                      ref={ref}
                    >
                      {users.length > 0 &&
                        users.map((item, index) => {
                          return <UserCard key={index} user={item} />;
                        })}

                      {debouncedValue.length > 0 && users.length == 0 && (
                        <div className="w-full h-20 flex items-center justify-center text-base text-gray-500 font-semibold  bg-white ">
                          No data
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <NotifyModal />

              <FormControl className="w-[150px] ">
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  id="language-select"
                  value={language}
                  onChange={handleChange}
                  label="Language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="vi">Tiếng Việt</MenuItem>
                </Select>
              </FormControl>

              {auth?.user?.avatar ? (
                <IconButton
                  onClick={handleClickAvatar}
                  size="small"
                  sx={{ ml: 2 }}
                  className="w-[40px] h-[40px]"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={auth?.user?.avatar}
                    sx={{ width: 50, height: 50 }}
                    className="mr-3 cursor-pointer"
                  />
                </IconButton>
              ) : (
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  animation="wave"
                />
              )}

              <Menu
                anchorEl={anchorElAvatar}
                id="account-menu"
                open={openAvatar}
                onClose={handleCloseAvatar}
                onClick={handleCloseAvatar}
                className="w-[400px]"
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
                <MenuItem onClick={handleProfile}>
                  <PersonOutlineOutlinedIcon className="mr-2" /> {t('profile')}
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleSignOut}>
                  <Button
                    variant="contained"
                    className="py-2 my-2 w-full rounded-lg bg-mango-primary-blue !font-semibold !text-white "
                    type="submit"
                    sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                    startIcon={<LogoutIcon />}
                  >
                    {t('logOut')}
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default React.memo(Header);
