import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Posts from '@/components/HomePage/Posts';
import Status from '@/components/HomePage/Status';
import LayoutMain from '@/components/layouts/LayoutMain';
import RightSideBar from '@/components/HomePage/RightSideBar';
import { getPosts } from '@/store/post/postAction';
import { getSuggestion } from '@/store/suggestion/suggestionAction';

export default function HomeScreen() {
  const auth = useAppSelector((state) => state.authSlice.auth);
  const isChangeRedux = useAppSelector((state) => state.userSlice.isChange);
  const dispatch = useAppDispatch();
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
  useEffect(() => {
    if (auth?.token) {
      dispatch(getSuggestion(auth.token));
    }
  }, [auth, auth.token, dispatch]);

  return (
    <LayoutMain>
      <div className="   bg-main-home min-h-screen ">
        <Grid
          container
          spacing={2}
          className="py-5 md2:px-80 md1:px-44 sm:px-2 px-2 "
        >
          <Grid xs={12} md={8} item>
            {auth?.token && <Status />}
            <Posts />
          </Grid>
          <Grid xs={12} md={4} item>
            <RightSideBar />
          </Grid>
        </Grid>
      </div>
    </LayoutMain>
  );
}
