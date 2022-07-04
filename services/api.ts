import apisauce from 'apisauce';
// import { Auth } from 'aws-amplify';
// import axios from 'axios';
import appConfig from '../app-config';
// import { ACCOUNT_STATUS } from '../app-config/constants';
// import { MockAccounts, MockProperties, MockRoles, WorkRequests } from '../mocks';

import { newCancelToken } from '../utils';
// import { TokenService } from '.';

const create = (baseURL = appConfig.API_URL || '') => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  // api.axiosInstance.interceptors.request.use((config) => {
  //   return TokenService.getToken()
  //     .then((token) => {
  //       config.headers.Authorization = 'Bearer ' + token;
  //       return Promise.resolve(config);
  //     })
  //     .catch(() => {
  //       return Promise.resolve(config);
  //     });
  // });
  const getRoot = () => api.get('');

  // ====================== Auth ======================
  // const signIn = (body: SignInPayload) => Auth.signIn(body.username, body.password);
  // const signUp = (body: SignUpPayload) => {
  //   const params = {
  //     username: body.username,
  //     password: body.password,
  //   };

  //   // const attributes = { phone_number: body.phoneNumber, given_name: body.firstName, family_name: body.lastName };
  //   const attributes = {
  //     email: body.username,
  //     given_name: body.firstName,
  //     family_name: body.lastName,
  //   };

  //   return Auth.signUp({ ...params, attributes });
  // };

  // const resendSignUp = (body: ResendSignUpPayload) => Auth.resendSignUp(body.username);

  // const confirmSignUp = (body: ConfirmSignUpPayload) =>
  //   Auth.confirmSignUp(body.username, body.code);

  // const signOut = () => Auth.signOut();

  // const getPermission = () => api.get('/me/permission', {}, newCancelToken());

  // const forgotPassword = (body: ForgotPasswordPayload) => Auth.forgotPassword(body.email);

  // const submitForgotPassword = (body: SubmitForgotPasswordPayload) =>
  //   Auth.forgotPasswordSubmit(body.email, body.token, body.password);

  // const changePassword = (body: ChangePasswordPayload) =>
  //   Auth.changePassword(body.user, body.currentPassword, body.newPassword);

  // const confirmSignIn = (body: ConfirmSignInPayload) =>
  //   Auth.confirmSignIn(body.user, body.code, 'SOFTWARE_TOKEN_MFA');

  // ====================== Content ======================
  const getTodoList = () =>
    api.get('https://jsonplaceholder.typicode.com/todos', {}, newCancelToken());
  const getUsers = () =>
    api.get('https://jsonplaceholder.typicode.com/users', {}, newCancelToken());

  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  //
  // Notice we're not returning back the `api` created in step 1. That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    getRoot,

    // ====================== Content ======================
    getTodoList,
    getUsers,
  };
};

export type Apis = ReturnType<typeof create>;

export default {
  create,
};
