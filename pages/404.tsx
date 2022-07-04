import type { NextPage } from 'next';
import Link from 'next/link';
import { View } from '../components/commons';

const Home: NextPage = () => {
  return (
    <View className="c-container" justify="center" align="center">
      <h1>Page Not Found</h1>

      <div>
        <Link href={'/'}>
          <a>
            <h2>Back to Home &rarr;</h2>
            Welcome to Next.js!
          </a>
        </Link>
      </div>
    </View>
  );
};

export default Home;
