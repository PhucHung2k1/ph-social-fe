import NextAuth from 'next-auth/next';

type User = {
  avatar: string;
  coverImage: string;
  role: string;
  gender: string;
  mobile: string;
  address: string;
  story: string;
  website: string;
  followers: any[];
  following: any[];
  saved: any[];
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

declare module 'next-auth' {
  interface Session {
    user: {
      data: {
        msg: string;
        access_token: string;
        refresh_token: string;
        user: User;
      };
    };
  }
}
