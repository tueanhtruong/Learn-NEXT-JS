import '../styles/globals.scss';
import '../components/components.scss';
import './pages.scss';
import '../layout/layout.scss';
import type { AppProps } from 'next/app';
import Screen from '../components/Screen';
import Navbar from '../components/Navbar';
import { wrapper } from '../redux/store';
import Auth from '../components/Auth';
import Toastify from '../components/Toastify';
import 'react-toastify/dist/ReactToastify.css';
import Content from '../components/Content';
import Dialog from '../components/Dialog';

type MyAppProps = AppProps;

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <Screen showNavbar>
      <Navbar />
      <Auth>
        <Component {...pageProps} />
      </Auth>
      <Toastify />
      <Content />
      <Dialog />
    </Screen>
  );
}

export default wrapper.withRedux(MyApp);
