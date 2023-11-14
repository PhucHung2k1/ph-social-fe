import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AuthService } from '@/services/auth.service';
import dbConnect from '@/config/dbConnect';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        dbConnect();
        const { email, password, hasRefreshToken } = credentials as {
          email: string;
          password: string;
          hasRefreshToken: boolean;
        };

        const servicesAuthAPI = new AuthService();

        try {
          const { data, status, error } = await servicesAuthAPI.login({
            email,
            password,
            hasRefreshToken,
          });

          if (status === 200) {
            return { data, status, message: 'Successfully' };
          }
          if (error) {
            throw new Error(error ? error.data.msg : 'Sign-in failed.');
            return error;
          }
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  // pages: {
  //   signIn: '/login',
  // },
  secret: process.env.NEXTAUTH_SECRET,

  // callbacks: {
  //   async jwt({ token, user }) {
  //     return { ...token, ...user };
  //   },
  //   async session({
  //     session,
  //     token,
  //     user,
  //   }: {
  //     session: any;
  //     token: any;
  //     user: any;
  //   }) {
  //
  //     session.user = token?.data?.user;
  //     session.accessToken = token?.data?.access_token;
  //     session.refreshtoken = token.data?.refresh_token;
  //     session.error = token.error;
  //     if (!token.data) {
  //       session.user = token;
  //     }

  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
