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
import { useComponentDidMount } from '../hooks';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { NavLayout } from '../layout';
import { LayoutProps } from '@/layout/EmptyLayout';

export type PageLayoutProps = (_page: LayoutProps) => ReactElement;

export type NextPageWithLayout<T> = NextPage<T> & {
  Layout?: PageLayoutProps;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<any>;
};

function MyApp({ Component, pageProps: { _session, ...pageProps } }: AppPropsWithLayout) {
  useComponentDidMount(() => {
    import('@lottiefiles/lottie-player');
  });
  const Layout = Component.Layout ?? NavLayout;
  return (
    // <Screen showNavbar>
    //   <Navbar />
    <Layout>
      <Auth>
        <Component {...pageProps} />
      </Auth>
      <Toastify />
      <Content />
      <Dialog />
    </Layout>
    // </Screen>
  );
}

export default wrapper.withRedux(MyApp);
