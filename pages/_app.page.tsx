import '../styles/globals.scss';
import '../components/components.scss';
import './pages.scss';
import '../layout/layout.scss';
import type { AppProps } from 'next/app';
import Screen from '../components/Screen';
import Navbar from '../components/Navbar';
import { wrapper } from '../redux/store';
import { SessionProvider } from 'next-auth/react';
import Auth from '../components/Auth';
import Toastify from '../components/Toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-slideshow-image/dist/styles.css';
import Content from '../components/Content';

type MyAppProps = AppProps;

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <Screen showNavbar>
        <Navbar />
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Screen>
      <Toastify />
      <Content />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
