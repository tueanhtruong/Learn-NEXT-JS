import type { NextPage } from 'next';
import Link from 'next/link';
import { PATHS } from '../../../app-config/paths';
import { Button, View } from '../../../components/commons';

const SignUp: NextPage = () => {
  return (
    <View className="c-container">
      <h1>Sign Up Page</h1>
      <View isRow>
        <Link href={PATHS.root} passHref>
          <Button variant="outline" className="mr-16">
            Back
          </Button>
        </Link>
        <Link href={PATHS.signIn} passHref>
          <Button>Sign In</Button>
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
