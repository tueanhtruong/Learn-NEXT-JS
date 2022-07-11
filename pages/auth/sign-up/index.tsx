import type { NextPage } from 'next';
import Link from 'next/link';
import { PATHS } from '../../../app-config/paths';
import { Button, Form, Input, InputPassword, View } from '../../../components/commons';
import { SigninSchema } from '../helpers';
import { Formik, FormikProps } from 'formik';
import { useRef } from 'react';
import { IRootState } from '../../../redux/rootReducer';
import { signUpAction } from '../../../redux/auth/authSlice';
import { connect } from 'react-redux';
import { SignUpPayload } from '../../../redux/auth/type';

type FormValue = {
  email: string;
  password: string;
};

const INITIAL: FormValue = { email: '', password: '' };

const SignUp: NextPage<Props> = ({ loading, onSignUp }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);

  const handleSubmit = (value: FormValue) => {
    console.log('value: ', value);
    onSignUp({
      email: value.email,
      password: value.password,
    });
  };

  // const handleSignInGoogle = () => signIn('google', { callbackUrl: appConfig.NEXT_AUTH_URL });

  return (
    <View className="ctn-uam" justify="center" align="center">
      <View className="ctn-uam__background" />
      <View className="ctn-uam__container">
        <h1 className="mb-32">Sign Up</h1>
        <Formik
          initialValues={INITIAL}
          onSubmit={handleSubmit}
          validationSchema={SigninSchema}
          innerRef={formRef}
        >
          {({ values, errors, touched, getFieldProps, handleSubmit }) => (
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
                  isLoading={loading}
                  variant="secondary"
                  className="mb-8 min-width"
                >
                  Sign Up
                </Button>
              </View>
              <View isRow align="center" justify="center">
                <Link href={PATHS.signIn} passHref>
                  <a>
                    <Button variant="link-primary">Sign In</Button>
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

// export default SignUp;

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onSignUp: (payload: SignUpPayload | null) => dispatch(signUpAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
