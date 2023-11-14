import { Button } from '@mui/material';
import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick: any;
  bgHover?: string;
  className?: string;
  type?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  bgHover = 'button-hover-cyan',
  className,
  type = 'button',
}) => {
  return (
    <>
      <Button
        variant="text"
        onClick={onClick}
        sx={{ '&:hover': { backgroundColor: bgHover } }}
        className={className}
        // type={type}
      >
        {children}
      </Button>
    </>
  );
};

export default CustomButton;
