import '../styles/globals.scss';
import '../components/components.scss';
import './pages.scss';
import '../layout/layout.scss';
import type { AppProps } from 'next/app';
// import Screen from '../components/Screen';
// import Navbar from '../components/Navbar';
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
import { config } from 'aws-sdk';
import appConfig from '@/app-config/index';
import Amplify from 'aws-amplify';
import { SWRConfig } from 'swr';
import axiosClient from 'admin-service/axios-client';

if (typeof window === 'undefined') {
  config.update(appConfig.SDK_CONFIG);
  Amplify.configure(appConfig.AWS_CONFIG);
}

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
    <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
      <Layout>
        <Auth>
          <Component {...pageProps} />
        </Auth>
        <Toastify />
        <Content />
        <Dialog />
      </Layout>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
