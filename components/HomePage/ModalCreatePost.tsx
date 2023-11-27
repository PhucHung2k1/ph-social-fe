import { useAppDispatch, useAppSelector } from '@/store/hook';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import Tabs from '@mui/material/Tabs';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import Tab from '@mui/material/Tab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoodIcon from '@mui/icons-material/Mood';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Modal,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useState, useRef } from 'react';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { createPost } from '@/store/post/postAction';
import AvatarItemCreatePost from './AvatarItemCreatePost';
import { useForm } from 'react-hook-form';
import { showLoading } from '@/store/loading/loadingSlice';
import { setIsChange } from '@/store/user/userSlice';
import { Clear, Search } from '@mui/icons-material';
import { useDebounce } from 'usehooks-ts';
import {
  FeelingItem,
  arrActivityItem,
  arrFeelingItems,
} from '@/store/globalTypes';
import ModalClose from './ModalClose';
import Icons from '../Icon';
import { useTranslation } from 'react-i18next';

interface ModalCreatePostProps {
  open: any;
  setOpen: any;
  typeModal: any;
  setTypeModal: any;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="py-3 px-1">
          <Typography className="normal-case">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ModalCreatePost: React.FC<ModalCreatePostProps> = ({
  open,
  setOpen,
  typeModal,
  setTypeModal,
}) => {
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [openModalClose, setOpenModalClose] = useState(false);
  const [feeling, setFeeling] = useState<FeelingItem>({
    avt: '',
    label: '',
    activity: false,
  });
  const socket = useAppSelector((state: any) => state.socketSlice.socket);
  const [content, setContent] = useState('');
  const { t } = useTranslation();
  const [valueSearch, setValueSearch] = useState<any>('');
  const debouncedValue = useDebounce<string>(valueSearch, 500);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,

    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
  };
  const [valueTab, setValueTab] = useState(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
    setValueSearch('');
  };

  const [images, setImages] = useState<any>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>();

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state: any) => state.authSlice.auth);
  const handleClose = () => {
    setOpen(false);
    setTypeModal('');
    setFeeling({
      avt: '',
      label: '',
      activity: false,
    });
  };

  const handleChangeImages = (e: any) => {
    const files = [...e.target.files];
    let err = '';
    let newImages: any = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist.');

      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image/video largest is 5mb.');
      }

      return newImages.push(file);
    });

    if (err) showToastMessage(dispatch, err, 'error');
    setImages([...images, ...newImages]);
  };
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file));
      setImages([...images, file]);
    }
  };

  const deleteImages = (index: any) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleClearInput = () => {
    setValueSearch('');
  };

  const handleCreatePost = (values: any) => {
    if (images?.length === 0) {
      showToastMessage(dispatch, 'Please add your photo!', 'error');
      return;
    }
    dispatch(showLoading(true));
    setIsLoadingModal(true);

    dispatch(
      createPost({
        content,
        images,
        auth,
        feelingStatus: feeling?.label,
        feelingImage: feeling?.avt,
        isActivity: feeling?.activity ? true : false,
        socket,
      })
    )
      .then((res: any) => {
        if (res?.status === 200) {
          // setOpen(false);
          setIsLoadingModal(false);
          setFeeling({ avt: '', label: '' });
        }
      })

      .finally(() => {
        dispatch(showLoading(false));
        setImages([]);
        setOpen(false);
        setContent('');
        setValue('content', '');
        dispatch(setIsChange());
        setIsLoadingModal(false);
      });
    setOpen(false);
  };

  return (
    <>
      {/* <ModalClose open={openModalClose} setOpen={setOpenModalClose} /> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {typeModal !== 'activity' ? (
          <Box sx={style} className="w-[500px]">
            <div className="flex relative items-center justify-center ">
              <div className="text-lg flex items-center justify-center pb-2 font-semibold border-b border-gray-300 w-full">
                Create Post
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

            <div className=" pt-4 max-h-[400px]  overflow-y-auto bg-white ">
              <div className="flex items-center gap-2 w-full   border-gray-300 pb-4">
                {auth ? (
                  <IconButton
                    size="small"
                    sx={{ ml: 2 }}
                    className="w-[40px] h-[40px]"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={auth?.user?.avatar || ''}
                      sx={{ width: 44, height: 44 }}
                      className="mr-3 cursor-pointer"
                    />
                  </IconButton>
                ) : (
                  <Skeleton
                    variant="circular"
                    width={44}
                    height={44}
                    animation="wave"
                  />
                )}

                <div
                  className="w-full  flex cursor-pointer text-base rounded-full h-10  items-center justify-start "
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <div className="font-semibold flex items-center gap-1 text-black">
                    {auth?.user?.fullname}
                    {feeling?.avt !== '' && (
                      <div
                        className="text-sm flex items-center"
                        onClick={() => {
                          setTypeModal('activity');
                        }}
                      >
                        is
                        <Avatar
                          alt="Remy Sharp"
                          src={feeling.avt || ''}
                          sx={{ width: 20, height: 20 }}
                          className="mx-1 cursor-pointer"
                        />
                        {!feeling?.activity && 'feeling'} {feeling?.label || ''}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleCreatePost)}>
              <div className="status_body">
                <textarea
                  name="content"
                  value={content}
                  placeholder={`${auth?.user?.username}, what are you thinking?`}
                  onChange={(e: any) => setContent(e.target.value)}
                />

                <div className="flex">
                  <div className="flex-1"></div>
                  <Icons setContent={setContent} content={content} />
                </div>
                <div className="show_images">
                  {images.map((img: any, index: any) => (
                    <AvatarItemCreatePost
                      key={index}
                      img={img}
                      index={index}
                      deleteImages={deleteImages}
                    />
                  ))}
                </div>

                <div className="input_images ">
                  <>
                    <div className="file_upload !mx-0 ">
                      <OndemandVideoOutlinedIcon />

                      <Tooltip
                        title="Video"
                        placement="top"
                        className="cursor-pointer"
                      >
                        <input
                          type="file"
                          name="video"
                          id="file"
                          multiple
                          accept="video/*"
                          onChange={handleVideoChange}
                          className="cursor-pointer w-[30px] "
                        />
                      </Tooltip>
                    </div>
                    <div className="file_upload">
                      <PhotoOutlinedIcon />

                      <Tooltip
                        title="Photo"
                        placement="top"
                        className="cursor-pointer"
                      >
                        <input
                          type="file"
                          name="file"
                          id="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleChangeImages}
                          className="cursor-pointer w-[30px]"
                        />
                      </Tooltip>
                    </div>
                    <div
                      className=""
                      onClick={() => {
                        setTypeModal('activity');
                      }}
                    >
                      <Tooltip
                        title="Feeling/Activity"
                        placement="top"
                        className="cursor-pointer"
                      >
                        <MoodIcon />
                      </Tooltip>
                    </div>
                  </>
                </div>
              </div>
              <div className="status_footer">
                <Button
                  variant="contained"
                  className="!mt-3 h-10 w-full rounded-lg bg-mango-primary-blue !font-semibold !text-white normal-case "
                  type="submit"
                  sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                >
                  Post
                </Button>
              </div>
            </form>
          </Box>
        ) : (
          <Box sx={style} className="">
            <div className="flex relative items-center justify-center ">
              <div className="text-lg flex items-center justify-center pb-2 font-semibold border-b border-gray-300 w-full">
                {valueTab === 0
                  ? 'How are you feeling?'
                  : 'What are you doing?'}
              </div>
              <div
                className="absolute left-[-10px] top-[-10px] text-sm"
                onClick={() => {
                  setTypeModal('');
                }}
              >
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </div>
            </div>

            <div className=" pt-4  bg-white ">
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={valueTab}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Feelings"
                    {...a11yProps(0)}
                    className="normal-case text-base"
                  />
                  <Tab
                    label="Activity"
                    {...a11yProps(1)}
                    className="normal-case text-base"
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={valueTab} index={0}>
                <div className="flex flex-col gap-5">
                  <TextField
                    variant="outlined"
                    placeholder={`${t('search')}`}
                    InputProps={{
                      style: {
                        height: '40px',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '16px',
                      },
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
                    className=" w-full  bg-gray-100 !border-none !outline-none "
                    value={valueSearch}
                    onChange={(e) => setValueSearch(e.target.value)}
                  />
                  <div className=" h-[400px] ">
                    <div className="max-h-[400px] flex flex-wrap gap-0  overflow-y-auto">
                      {arrFeelingItems
                        .filter((item1) => item1.label.includes(debouncedValue))
                        .map((item: FeelingItem, index: any) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-start w-full md:w-1/2 h-12 p-2 rounded-xl hover:bg-gray-300 cursor-pointer"
                              onClick={() => {
                                setFeeling(item);
                                setTypeModal('');
                                setValueSearch('');
                              }}
                            >
                              <Avatar
                                alt="Remy Sharp"
                                src={item?.avt || ''}
                                sx={{ width: 30, height: 30 }}
                                className="mr-2 cursor-pointer"
                              />
                              <div className="">{item.label}</div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={valueTab} index={1}>
                <div className="flex flex-col gap-5">
                  <TextField
                    variant="outlined"
                    placeholder={`${t('search')}`}
                    InputProps={{
                      style: {
                        height: '40px',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '16px',
                      },
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
                    className=" w-full  bg-gray-100 !border-none !outline-none "
                    value={valueSearch}
                    onChange={(e) => setValueSearch(e.target.value)}
                  />
                  <div className=" h-[400px] ">
                    <div className="max-h-[400px] flex flex-wrap gap-0  overflow-y-auto">
                      {arrActivityItem
                        .filter((item1) => item1.label.includes(debouncedValue))
                        .map((item: FeelingItem, index: any) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-start w-1/2 h-12 p-2 rounded-xl hover:bg-gray-300 cursor-pointer"
                              onClick={() => {
                                setFeeling(item);
                                setTypeModal('');
                                setValueSearch('');
                              }}
                            >
                              <Avatar
                                alt="Remy Sharp"
                                src={item?.avt || ''}
                                sx={{ width: 30, height: 30 }}
                                className="mr-2 cursor-pointer"
                              />
                              <div className="">{item.label}</div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </CustomTabPanel>
            </div>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default ModalCreatePost;
