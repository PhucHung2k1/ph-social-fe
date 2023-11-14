import React, { useEffect, useState } from 'react';
import { signIn, getSession, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { sxCheckBox, sxTextField } from '@/utils/helper/style';
// import LayoutAuthen from '@/components/layouts/LayoutAuth';

const LayoutAuthen = dynamic(() => import('@/components/layouts/LayoutAuth'), {
  ssr: false,
});
const LoginForm = dynamic(
  () => import('@/components/Authentication/LoginForm'),
  {
    ssr: false,
  }
);
export interface ISignInForm {
  username: string;
  password: string;
  hasRefreshToken?: boolean;
}

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);
  return (
    <>
      <LayoutAuthen type="login" titlePage="Login">
        <LoginForm />
      </LayoutAuthen>
    </>
  );
}
