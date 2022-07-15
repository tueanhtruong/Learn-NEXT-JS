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
  ////////////////////////////////////////////
  starFall: '/star-fall',
};

export const PRIVATE_PATHS = [
  PATHS.myProfile,
  PATHS.configuration,
  PATHS.editProfile,
  PATHS.shopping,
];
export const HIDE_NAV_PATHS = [PATHS.starFall];
