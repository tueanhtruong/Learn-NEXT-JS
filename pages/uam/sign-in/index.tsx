import type { NextPage } from 'next';
import Link from 'next/link';
import { PATHS } from '../../../app-config/paths';
import { Button, View } from '../../../components/commons';

const SignIn: NextPage = () => {
  return (
    <View className="c-container">
      <h1>Sign In Page</h1>
      <View isRow>
        <Link href={PATHS.root} passHref>
          <a>
            <Button variant="outline" className="mr-16">
              Back
            </Button>
          </a>
        </Link>
        <Link href={PATHS.signUp} passHref>
          <a>
            <Button>Sign Up</Button>
          </a>
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
