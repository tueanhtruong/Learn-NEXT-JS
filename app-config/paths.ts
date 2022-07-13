export const PATHS = {
  root: '/',
  dev: '/dev',
  uam: '/auth',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  forgotPassword: '/forgot-password',
  firstTimeLogin: '/send-code',
  resetPassword: '/reset-password',
  myProfile: '/my-profile',
  editProfile: '/my-profile/edit',
  shopping: '/shopping',
  configuration: '/configuration',
};

export const PRIVATE_PATHS = [
  PATHS.myProfile,
  PATHS.configuration,
  PATHS.editProfile,
  PATHS.shopping,
];
