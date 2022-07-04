import '../styles/globals.scss';
import '../components/components.scss';
import type { AppProps } from 'next/app';
import Screen from '../components/Screen';
import Navbar from '../components/Navbar';
// import { Provider } from 'react-redux';
import { wrapper } from '../redux/store';

type MyAppProps = AppProps;

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Screen showNavbar>
      <Navbar />
      <Component {...pageProps} />;
    </Screen>
  );
}

export default wrapper.withRedux(MyApp);
