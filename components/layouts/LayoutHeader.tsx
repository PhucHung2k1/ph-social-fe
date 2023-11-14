import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Chip } from '@mui/material';

export interface LayoutHeaderProps {
  children?: React.ReactNode;
}

export default function LayoutHeader({ children }: LayoutHeaderProps) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex h-16 items-center  px-3">
        <div className="flex h-[60px] w-[60px] gap-2 items-center justify-center rounded-3xl ">
          <Image
            src="/images/logo-main.svg"
            alt="fbIcon"
            width={18}
            height={18}
            className="w-[60%] cursor-pointer"
          />
        </div>
        <h2 className="my-auto truncate text-left text-[18px] font-extrabold uppercase leading-[18px] text-mango-text-black-1">
          PHSocial
        </h2>
      </nav>
      <div className="">{children}</div>
    </div>
  );
}
