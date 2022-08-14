import type { NextPage } from 'next';
import Link from 'next/link';
import { PATHS } from '@/app-config/paths';
import { Button, Form, Input, InputPassword, View } from '@/components/commons';
import { SigninSchema } from '../helpers';
import { Formik, FormikProps } from 'formik';
import { useRef } from 'react';
import { IRootState } from '@/redux/rootReducer';
import { connect } from 'react-redux';
import { signInAction } from '@/redux/auth/authSlice';
import { SignInPayload } from '@/redux/auth/type';

type FormValue = {
  email: string;
  password: string;
};

const INITIAL: FormValue = { email: '', password: '' };

const SignIn: NextPage<Props> = ({ onSignIn, loading }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const handleSubmit = (value: FormValue) => {
    onSignIn({
      username: value.email,
      password: value.password,
    });
  };

  // const handleSignInGoogle = () => signIn('google', { callbackUrl: appConfig.NEXT_AUTH_URL });

  return (
    <View className="ctn-uam" justify="center" align="center">
      <View className="ctn-uam__background" />
      <View className="ctn-uam__container">
        <h1 className="mb-32">Sign In</h1>
        <Formik
          initialValues={INITIAL}
          onSubmit={handleSubmit}
          validationSchema={SigninSchema}
          innerRef={formRef}
        >
          {({ errors, touched, getFieldProps, handleSubmit }) => (
            <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
              <Input
                label="Email Address"
                placeholder="Email Address"
                errorMessage={touched.email ? errors.email : ''}
                containerClassName="mb-16"
                {...getFieldProps('email')}
              />
              <InputPassword
                label="Password"
                placeholder="Password"
                errorMessage={touched.password ? errors.password : ''}
                containerClassName="mb-16"
                {...getFieldProps('password')}
              />
              <View className="mt-32" align="flex-end">
                <Button
                  type="submit"
                  variant="secondary"
                  className="mb-8 min-width"
                  isLoading={loading}
                >
                  Log In
                </Button>
              </View>
              <View isRow align="center" justify="center">
                {/* <Button
                  type="button"
                  variant="link-danger"
                  className="mr-16"
                  onClick={handleSignInGoogle}
                  icon={<FcGoogle size={24} />}
                >
                  Sign In With Google
                </Button> */}
                <Link href={PATHS.signUp} passHref>
                  <a>
                    <Button variant="link-primary">Sign Up</Button>
                  </a>
                </Link>
              </View>
            </Form>
          )}
        </Formik>
      </View>
    </View>
  );
};

// export default SignIn;

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.auth.loading,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onSignIn: (payload: SignInPayload | null) => dispatch(signInAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
