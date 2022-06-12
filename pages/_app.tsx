import '../styles/globals.scss';
import '../components/components.scss';
import type { AppProps } from 'next/app';
import Screen from '../components/Screen';
import Navbar from '../components/Navbar';
// import { useRouter } from 'next/router';
// import { Navigator } from '../services';

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  // Navigator.setTopRouter(router);
  return (
    <Screen showNavbar>
      <Navbar />
      <Component {...pageProps} />;
    </Screen>
  );
}

export default MyApp;
