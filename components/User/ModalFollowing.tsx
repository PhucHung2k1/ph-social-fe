import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, Modal } from '@mui/material';
import React from 'react';
import UserItemModal from './UserItemModal';
import { useTranslation } from 'react-i18next';
interface ModalFollowingProps {
  users: Array<any>;
  open: any;
  setOpen: any;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};
const ModalFollowing: React.FC<ModalFollowingProps> = ({
  users,
  open,
  setOpen,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex relative items-center justify-center ">
          <div className="text-lg flex items-center justify-center pb-2 font-semibold border-b border-gray-300 w-full">
            {t('following')}
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
          {users?.length > 0 &&
            users.map((item, key) => {
              return <UserItemModal item={item} key={key} setOpen={setOpen} />;
            })}
        </div>
      </Box>
    </Modal>
  );
};

export default ModalFollowing;
