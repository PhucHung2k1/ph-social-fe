import '../styles/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material';
import { Router } from 'next/router';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import PrevLoader from '../components/Loading/PreLoader';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '../store/store';
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
    success: {
      main: '#69B000',
    },
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
            <Component {...pageProps} />
            <PrevLoader />
          </main>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
