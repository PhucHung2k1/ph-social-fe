import { FeelingItem } from '@/store/globalTypes';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { showLoading } from '@/store/loading/loadingSlice';
import { createPost } from '@/store/post/postAction';
import { setIsChange } from '@/store/user/userSlice';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import ClearIcon from '@mui/icons-material/Clear';
import MoodIcon from '@mui/icons-material/Mood';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Skeleton,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import AvatarItemCreatePost from './AvatarItemCreatePost';

interface ModalCloseProps {
  open: any;
  setOpen: any;
}

const ModalClose: React.FC<ModalCloseProps> = ({ open, setOpen }) => {
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [feeling, setFeeling] = useState<FeelingItem>({
    avt: '',
    label: '',
    activity: false,
  });
  const socket = useAppSelector((state: any) => state.socketSlice.socket);

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

  const [images, setImages] = useState<any>([]);

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
  };

  const handleChangeImages = (e: any) => {
    const files = [...e.target.files];
    let err = '';
    let newImages: any = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exists!');
      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return (err = 'File format is incorret!');
      return newImages.push(file);
    });

    if (err) {
      showToastMessage(dispatch, err, 'error');
    }
    setImages([...images, ...newImages]);
  };
  const deleteImages = (index: any) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleCreatePost = (values: any) => {
    dispatch(showLoading(true));
    setIsLoadingModal(true);

    // if (images.length === 0) {
    //   showToastMessage(dispatch, 'Please add your photo.', 'error');
    // }
    dispatch(
      createPost({
        content: values?.content,
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
        setValue('content', '');
        dispatch(setIsChange());
        setIsLoadingModal(false);
      });
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[300px] sm:w-[500px]">
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
                    <div className="text-sm flex items-center">
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
                {...register('content', {})}
                placeholder={`${auth?.user?.username}, what are you thinking ?`}
                style={{ resize: 'vertical' }}
              ></textarea>
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

              <div className="input_images">
                <>
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
                        accept="image/*"
                        onChange={handleChangeImages}
                        className="cursor-pointer w-[30px]"
                      />
                    </Tooltip>
                  </div>
                  <div className="">
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
      </Modal>
    </>
  );
};

export default ModalClose;
