/* eslint-disable react-hooks/exhaustive-deps */
import FollowBtn from '@/components/Common/FollowBtn';
import Status from '@/components/HomePage/Status';
import PostsProfile from '@/components/Profile/PostsProfile';
import ModalFollowers from '@/components/User/ModalFollowers';
import ModalFollowing from '@/components/User/ModalFollowing';
import LayoutMain from '@/components/layouts/LayoutMain';
import { formatNumber, removeDuplicates } from '@/store/globalTypes';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { showLoading } from '@/store/loading/loadingSlice';
import { addUser } from '@/store/message/messageAction';
import { getPosts } from '@/store/post/postAction';
import { getProfileUsers } from '@/store/profile/profileAction';
import {
  getUserById,
  updateAvatar,
  updateCoverImage,
  updateProfile,
  updateStory,
} from '@/store/user/userAction';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { sxTextField } from '@/utils/helper/style';
import { checkImage } from '@/utils/imageUpload';
import { ErrorMessage } from '@hookform/error-message';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';
import EmailIcon from '@mui/icons-material/Email';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import WebIcon from '@mui/icons-material/Web';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Skeleton,
  TextField,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
interface IFormInput {
  fullname: string;
  mobilephone: string;
  address: number | string;
  website: string;
  story: string;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const ProfileID = () => {
  const { data: session }: any = useSession();
  const message = useAppSelector((state) => state.messageSlice);
  const router = useRouter();
  const profile = useAppSelector((state) => state.profileSlice);
  const [sex, setSex] = useState('');
  const handleChange = (event: any) => {
    setSex(event.target.value as string);
  };

  const auth = useAppSelector((state) => state.authSlice.auth);

  const { profileId } = router.query;
  const [userData, setUserData] = useState<any>({});

  const [showModalFollowers, setShowModalFollowers] = useState(false);
  const [showModalFollowing, setShowModalFollowing] = useState(false);
  const [open, setOpen] = useState(false);
  const homePost = useAppSelector((state) => state.homePost);

  const homePostFilterByUser = homePost?.posts?.map((item) => {
    if (item?.user?._id === profileId) {
      return item;
    } else {
      return false;
    }
  });
  const dataUserPost = homePostFilterByUser?.filter((item) => item !== false);
  const dataArrImagesNew = dataUserPost.map((item: any) => {
    if (!item?.images?.[0]?.url.includes('mp4')) {
      return item;
    } else {
      return null;
    }
  });
  const dataArrImagesNewFilter = dataArrImagesNew.filter(
    (item: any) => item !== null
  );

  const dataArrImages = dataUserPost
    .filter((item) => item.images && item.images.length > 0)
    .map((item) => ({ images: item.images }));

  const newData = dataArrImages.map((item) => {
    return item.images.filter(
      (itemFilter: any) => !itemFilter?.url?.includes('mp4')
    );
  });

  useEffect(() => {
    setShowModalFollowers(false);
    setShowModalFollowing(false);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const [selectedImage, setSelectedImage] = useState<any>();
  const [selectedImageCover, setSelectedImageCover] = useState<any>();
  const { t, i18n } = useTranslation();
  const newArray = removeDuplicates(profile.users, '_id');
  const [openStory, setOpenStory] = useState(false);
  const handleOpenStory = () => {
    setOpenStory(true);
  };
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      fullname: auth?.user?.fullname,
      mobilephone: auth?.user?.mobile,
    },
  });

  const date = new Date(userData?.createdAt || '');
  const dispatch = useAppDispatch();
  const isChangeRedux = useAppSelector((state) => state.userSlice.isChange);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const valueStory = watch('story');
  const formattedDate = `${day} ${month} ${year}`;
  const isShowLoading = useAppSelector((state) => state.loadingSlice.isLoading);
  const profileRedux = useAppSelector((state) => state.profileSlice);

  useEffect(() => {
    if (profileId === auth?.user?._id) {
      setUserData(auth?.user);
    } else {
      dispatch(getUserById({ users: profile.users, id: profileId, auth })).then(
        (res) => {
          if (res?.payload?.status === 400) {
            router.push('/login');
          }
        }
      );
      const newData = profile.users.find((item) => item._id === profileId);
      setUserData(newData);
    }
    // if (profileRedux.ids.every((item) => item !== profileId)) {

    // }
  }, [dispatch, profile.users, profileId, isChangeRedux]);

  useEffect(() => {
    if (profileId && auth?.user) {
      if (profileRedux.ids.every((item) => item !== profileId)) {
        dispatch(
          getProfileUsers({ users: profile.users, id: profileId, auth })
        );
      }
    }
  }, [profileRedux.users, profileId, dispatch, auth?.user]);

  useEffect(() => {
    if (userData?.gender) {
      setSex(userData.gender);
    }
  }, [userData?.gender]);
  useEffect(() => {
    // dispatch(showLoading(true));
    if (selectedImage) {
      const body = {
        id: userData?._id,
        avatar: selectedImage,
      };
      dispatch(updateAvatar(body)).then((res) => {
        setUserData(res?.payload?.data?.user);
      });
    }
  }, [dispatch, selectedImage]);
  useEffect(() => {
    if (selectedImageCover) {
      dispatch(showLoading(true));
      const body = {
        id: userData?._id,
        coverImage: selectedImageCover,
      };
      dispatch(updateCoverImage(body))
        .then((res) => {
          setUserData(res?.payload?.data?.user);
        })
        .finally(() => {
          dispatch(showLoading(false));
        });
    }
  }, [dispatch, selectedImageCover]);

  const handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    if (inputValue.length >= 11) {
      inputValue = inputValue.slice(0, 11);
    }
    setValue('mobilephone', inputValue);
  };
  interface Student {
    name: any;
    age: any;
  }

  const hung: Student = {
    name: 10,
    age: 10,
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (values: IFormInput) => {
    const body = { id: userData._id, ...values, sex };
    dispatch(updateProfile(body)).then((res) => {
      setUserData(res?.payload?.data?.newUser);
    });
    handleClose();
  };
  const handleInputStoryChange = (e: any) => {
    let inputValue = e.target.value;
    if (inputValue.length <= 200) {
      inputValue = inputValue.slice(0, 200);
    }
    setValue('story', inputValue);
  };
  const handleFileImage = async (e: any) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      showToastMessage(dispatch, err, 'error');
    }
    setSelectedImage(file);
  };
  const handleFileImageCover = async (e: any) => {
    const file = e.target.files[0];

    setSelectedImageCover(file);
  };
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

  const handleAddUser = (user: any) => {
    dispatch(addUser({ user, message }));
    router.push(`/messages/${user._id}`);
  };

  return (
    <LayoutMain>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex relative items-center justify-center ">
            <div className="text-3xl font-semibold">Edit Profile</div>
            <div
              className="absolute right-[-20px] top-[-20px] text-sm "
              onClick={handleClose}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
            </div>
          </div>

          <div className=" py-4 min-h-[56vh]  overflow-y-hidden bg-white ">
            <form onSubmit={handleSubmit(onSubmit)} className=" px-[32px]">
              <Grid container spacing={2}>
                <Grid xs={12} md={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={[sxTextField]}
                      label="Full Name"
                      type="text"
                      defaultValue={userData?.fullname}
                      error={Boolean(errors.fullname)}
                      {...register('fullname', {
                        required: 'Enter Your Full Name!',
                      })}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Face5OutlinedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="fullname"
                      render={({ message }: any) => (
                        <div
                          className="ml-2 mt-1 text-sm text-text-error"
                          role="alert"
                        >
                          <span className="font-medium">{message}</span>
                        </div>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      label="Mobile Phone"
                      type="number"
                      defaultValue={userData?.mobile}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        maxLength: 10,
                      }}
                      error={Boolean(errors.mobilephone)}
                      {...register('mobilephone', {
                        required: 'Enter Your Mobile Phone!',
                      })}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PeopleAltOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                        inputProps: { maxLength: 11 },
                        onInput: handleInputChange,
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="mobilephone"
                      render={({ message }: any) => (
                        <div
                          className="ml-2 mt-1 text-sm text-text-error"
                          role="alert"
                        >
                          <span className="font-medium">{message}</span>
                        </div>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      label="Address"
                      type="text"
                      defaultValue={userData?.address}
                      error={Boolean(errors.address)}
                      {...register('address', {
                        required: 'Enter Your Address!',
                      })}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="address"
                      render={({ message }: any) => (
                        <div
                          className="ml-2 mt-1 text-sm text-text-error"
                          role="alert"
                        >
                          <span className="font-medium">{message}</span>
                        </div>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      label="Website"
                      type="text"
                      defaultValue={userData?.website}
                      {...register('website')}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} md={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      label="Story"
                      defaultValue={userData?.story}
                      {...register('story')}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sex}
                      label="Sex"
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <EmailOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value={'male'}>Male</MenuItem>
                      <MenuItem value={'female'}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <Button
                      variant="contained"
                      className="!mt-3 h-12 w-full rounded-lg bg-mango-primary-blue !font-semibold !text-white "
                      type="submit"
                      sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                    >
                      EDIT
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Modal>
      <div className="min-h-screen bg-main-home">
        <div
          className={` bg-center bg-cover h-[500px] flex items-start p-5 justify-end`}
          style={{
            backgroundImage: `url(  ${
              selectedImageCover
                ? URL?.createObjectURL(selectedImageCover)
                : userData?.coverImage
            })`,
            backgroundSize: 'cover',
          }}
        >
          <>
            {auth?.user?._id === profileId && (
              <div className="flex h-[30px] cursor-pointer  border-white border-2  relative  w-[30px] gap-0 items-center justify-center rounded-3x bg-gray-300 rounded-full ">
                <IconButton>
                  <CameraAltIcon fontSize="small" />
                </IconButton>
                <input
                  className="bg-red-500 absolute top-0  h-[30px]  w-[30px] cursor-pointer opacity-0"
                  accept="image/*"
                  onChange={handleFileImageCover}
                  type="file"
                  id="imageUploadCovert"
                />
              </div>
            )}
          </>
        </div>

        <div className=" flex flex-col items-center justify-center w-[100%]">
          <div className=" mt-[-100px] md2:w-[70%] w-[80%] bg-white flex  items-center justify-between h-[200px] rounded-xl p-12">
            <div className="flex w-full justify-between">
              <div className="w-1/3 flex flex-col gap-4 items-center justify-center">
                <div className="flex flex-row items-center gap-5 w-full justify-center">
                  <div className="capitalize">
                    {t('role')}: {userData?.role}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {/* <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
                    <Image
                      src="/images/Authentication/icongoogle.svg"
                      alt="fbIcon"
                      width={20}
                      height={20}
                      className="w-[60%] cursor-pointer"
                    />
                  </div>
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
                    <Image
                      src="/images/Authentication/icongithub.svg"
                      alt="fbIcon"
                      width={23}
                      height={16}
                      className="w-[60%] cursor-pointer"
                    />
                  </div>
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
                    <Image
                      src="/images/Authentication/lniked-svg.png"
                      alt="fbIcon"
                      width={23}
                      height={16}
                      className="w-[60%] cursor-pointer"
                    />
                  </div>
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
                    <Image
                      src="/images/Authentication/fb-svg.png"
                      alt="fbIcon"
                      width={23}
                      height={16}
                      className="w-[60%] cursor-pointer"
                    />
                  </div> */}
                  <div className="flex items-center gap-4 mt-2">
                    {profileId === auth?.user?._id ? (
                      <div className="flex gap-3 !items-center !justify-center">
                        <Button
                          variant="outlined"
                          onClick={handleOpen}
                          className="!bg-mango-primary-blue !text-white !hover:bg-mango-primary-blue"
                        >
                          {t('editProfile')}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-3 !items-center !justify-center">
                        <FollowBtn user={userData} />
                        <Button
                          variant="outlined"
                          className={
                            '!bg-blue-500 w-28 !text-white hover:opacity-75' +
                            ' w-28'
                          }
                          onClick={() => handleAddUser(userData)}
                        >
                          Messenger
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <div className="flex flex-col items-center w-1/3">
                  <div className=" flex relative cursor-pointer">
                    {userData ? (
                      <Avatar
                        src={
                          selectedImage
                            ? URL?.createObjectURL(selectedImage)
                            : userData?.avatar
                        }
                        alt="User Avatar"
                        className="!w-48 !h-48 border-4 border-white mt-[-180px]"
                      ></Avatar>
                    ) : (
                      <Skeleton
                        variant="circular"
                        width={160}
                        height={160}
                        animation="wave"
                        className="mt-[-180px]"
                      />
                    )}
                    {userData?._id === auth?.user?._id && (
                      <>
                        <input
                          className="absolute bottom-0 right-0 z-10 mb-0 h-[185px] w-[185px] cursor-pointer opacity-0"
                          accept="image/*"
                          onChange={handleFileImage}
                          type="file"
                          id="imageUpload"
                        />
                        <div className="flex h-[40px] border-2 border-white absolute top-[70px] right-4 w-[40px] gap-0 items-center justify-center rounded-3x bg-gray-300 rounded-full mt-[-100px]">
                          <IconButton>
                            <CameraAltIcon fontSize="medium" />
                          </IconButton>
                        </div>
                      </>
                    )}
                  </div>

                  <div className=" text-black flex flex-col items-center gap-2 w-[300px]">
                    <h2 className="text-2xl font-bold text-center">
                      {userData?.fullname}
                    </h2>
                    <div className="text-sm flex items-center justify-between">
                      <div>{userData?.username || ''}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex items-center">
                <div
                  className={`flex items-center lg:gap-8 sm:gap-4 ${
                    i18n.language === 'vi' && ' !gap-[8px]'
                  } w-full justify-between`}
                >
                  <div className="flex flex-col items-center gap-2 ">
                    <div>{dataUserPost?.length}</div>
                    <div className="cursor-pointer">{t('posts')}</div>
                  </div>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <div
                    className="flex flex-col items-center gap-2 "
                    onClick={() => {
                      setShowModalFollowers(true);
                    }}
                  >
                    <div>{formatNumber(userData?.followers?.length)}</div>
                    <div className="cursor-pointer">{t('follower')}</div>
                  </div>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <div
                    className="flex flex-col items-center gap-2"
                    onClick={() => {
                      setShowModalFollowing(true);
                    }}
                  >
                    <div>{formatNumber(userData?.following?.length)}</div>
                    <div className="cursor-pointer">{t('following')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center justify-start w-[100%] pb-10 bg-main-home min-h-screen">
          <div className=" mt-[10px] md2:w-[70%] w-[80%] flex  items-center justify-between   ">
            <div className="flex  w-full gap-10 ">
              <div
                className={
                  'hidden w-[40%] gap-4 lg:flex mt-2 flex-col  items-start   rounded-xl  ' +
                  (profileId === auth?.user?._id
                    ? openStory
                      ? ' max-h-[540px]'
                      : '  max-h-[500px]'
                    : ' h-[370px]')
                }
              >
                {isShowLoading || !userData ? (
                  <Skeleton variant="rounded" width={450} height={600} />
                ) : (
                  <div className="bg-white flex flex-col w-full h-full py-5 px-6 gap-4 ">
                    <div className="font-semibold text-lg tracking-[1px]">
                      {t('intro')}
                    </div>
                    <div className="flex gap-2 flex-col items-center justify-center w-full">
                      <>
                        <div className="flex gap-2 flex-col items-center justify-center w-full">
                          {!openStory ? (
                            <>
                              <div className=" w-full flex items-center justify-center text-center">
                                {userData?.story || ''}
                              </div>
                              {profileId === auth?.user?._id && (
                                <div className="w-full">
                                  <Button
                                    variant="outlined"
                                    size="medium"
                                    className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-black normal-case text-sm font-semibold"
                                    onClick={handleOpenStory}
                                  >
                                    {t('editStory')}
                                  </Button>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {profileId === auth?.user?._id && (
                                <>
                                  <FormControl
                                    fullWidth
                                    className="text-sm font-normal !text-mango-text-black-1"
                                  >
                                    <TextField
                                      sx={{
                                        ...sxTextField,
                                        textAlign: 'center',
                                      }}
                                      type="text"
                                      multiline
                                      rows={4}
                                      defaultValue={userData?.story}
                                      error={Boolean(errors.address)}
                                      {...register('story', {
                                        required: 'Enter Your Address!',
                                      })}
                                      className="!rounded-sm border border-mango-text-gray-1 !outline-none "
                                      InputProps={{
                                        inputProps: { maxLength: 200 },
                                        onInput: handleInputStoryChange,
                                      }}
                                    />
                                  </FormControl>
                                  <div className="flex w-full items-center justify-end text-[12px] text-gray-600">
                                    {valueStory?.length
                                      ? valueStory.length
                                      : userData?.story.length}
                                    / 200 characters
                                  </div>
                                  <div className="flex w-full items-center justify-end gap-2 ">
                                    <Button
                                      variant="outlined"
                                      className="bg-gray-200 text-black hover:bg-gray-300 h-8 normal-case"
                                      onClick={() => {
                                        setOpenStory(false);
                                        setValue('story', userData?.story);
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      className="!bg-mango-primary-blue !hover:bg-mango-primary-blue !text-white h-8 normal-case"
                                      onClick={() => {
                                        if (valueStory !== userData?.story) {
                                          dispatch(
                                            updateStory({
                                              id: userData?._id,
                                              story: valueStory,
                                            })
                                          ).then((res) => {
                                            setUserData(
                                              res?.payload?.data?.newUser
                                            );
                                          });
                                        }

                                        setOpenStory(false);
                                      }}
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    </div>

                    <div className="flex gap-2 items-center">
                      <div>
                        <EmailIcon />
                      </div>
                      <div>{userData?.email}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <Face5OutlinedIcon />
                      </div>
                      <div className="capitalize">
                        {userData?.gender !== ''
                          ? userData?.gender
                          : 'Not update'}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <PhoneIcon />
                      </div>
                      <div className="">
                        {userData?.mobile !== ''
                          ? userData?.mobile
                          : 'Not update'}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <WebIcon />
                      </div>
                      <div className="">
                        {userData?.website === ''
                          ? 'Not update'
                          : userData?.website?.length > 50
                          ? userData?.website?.slice(0, 50) + '...'
                          : userData?.website}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <LocationOnIcon />
                      </div>
                      <div className="">
                        {userData?.address === ''
                          ? 'Not update'
                          : userData?.address?.length > 50
                          ? userData?.address?.slice(0, 50) + '...'
                          : userData?.address}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <AccessTimeFilledIcon />
                      </div>
                      <div className="">
                        {t('joined')} {formattedDate || ''}
                      </div>
                    </div>
                  </div>
                )}
                <>
                  {isShowLoading ? (
                    <div className="gap-4 h-[300px]">
                      <Skeleton variant="rounded" width={450} height={300} />
                    </div>
                  ) : (
                    <>
                      {dataArrImages.length > 0 ? (
                        <div className="bg-white flex flex-col w-full  py-5 px-6 gap-4 h-[600px]">
                          <div className=" text-lg  flex items-center justify-between">
                            <div className="tracking-[1px] font-semibold">
                              {t('photos')}
                            </div>
                          </div>
                          {isShowLoading ? (
                            <div className="grid gap-4 grid-cols-3">
                              {Array.from({
                                length:
                                  dataArrImages.length > 9
                                    ? 9
                                    : dataArrImages.length,
                              }).map((item: any, index) => {
                                return (
                                  <div key={index}>
                                    <Skeleton
                                      variant="rounded"
                                      width={150}
                                      height={150}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="grid gap-4 grid-cols-3">
                              {dataArrImagesNewFilter.length > 0 &&
                                dataArrImagesNewFilter
                                  .slice(0, 9)
                                  .map((item: any, index) => {
                                    return (
                                      <div key={index}>
                                        <Image
                                          src={item?.images?.[0]?.url}
                                          alt="fbIcon"
                                          width={200}
                                          height={200}
                                          className="cursor-pointer"
                                        />
                                      </div>
                                    );
                                  })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-white flex flex-col w-full  py-5 px-6 gap-4 h-[600px]">
                          <div className=" text-lg  flex flex-col items-start justify-start">
                            <div className="tracking-[1px] font-semibold">
                              {t('photos')}
                            </div>
                          </div>
                          <div className="flex items-center  py-10 justify-center font-semibold text-base cursor-pointer">
                            {t('nophoto')}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              </div>
              <div className=" w-full lg:w-[60%] gap-4 mt-2 flex flex-col items-start bg-main-home rounded-xl   ">
                {auth?.user?._id === profileId && <Status />}
                <PostsProfile
                  profileId={profileId}
                  dataUserPost={dataUserPost}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {userData?.followers?.length > 0 && (
        <ModalFollowers
          users={userData?.followers}
          open={showModalFollowers}
          setOpen={setShowModalFollowers}
        />
      )}
      {userData?.following?.length > 0 && (
        <ModalFollowing
          users={userData?.following}
          open={showModalFollowing}
          setOpen={setShowModalFollowing}
        />
      )}
    </LayoutMain>
  );
};

export default ProfileID;
