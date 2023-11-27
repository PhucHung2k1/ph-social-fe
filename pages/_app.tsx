import ToastContainer from '@/components/Toast';
import { ThemeProvider, createTheme } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import PrevLoader from '../components/Loading/PreLoader';
import { store } from '../store/store';
import '../styles/global.css';
import { ToastContainer as ToastContainer1 } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../i18n/i18n';
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false });

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    error: {
      main: '#DA2036',
    },
    secondary: {
      main: '#FFFFFF',
    },
    warning: {
      main: '#F28500',
    },
    primary: {
      main: '#00BDD6',
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <main>
            <Head>
              <title>PH Social</title>
              <link rel="icon" href="/images/logo-main.svg" />
            </Head>
            {/* <ScrollToTopButton /> */}
            <ToastContainer />
            <ToastContainer1 />
            <Component {...pageProps} />
            <PrevLoader />
          </main>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
