import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

interface DrawerNavProsp {
  openDrawer: boolean;
  handleDrawerClose: any;
}

const DrawerNav: React.FC<DrawerNavProsp> = ({
  openDrawer,
  handleDrawerClose,
}) => {
  return (
    <>
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        {/* Nội dung của Drawer */}
        <div style={{ width: '250px' }}>
          <h2>Drawer Content</h2>
          <p>This is the content of the drawer.</p>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerNav;
