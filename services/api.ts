import apisauce from 'apisauce';
import appConfig from '../app-config';
import { ConfirmSignUpPayload, SignInPayload, SignUpPayload } from '../redux/auth/type';

import { newCancelToken } from '../utils';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  sendPasswordResetEmail,
  Auth,
  sendEmailVerification,
  User,
} from 'firebase/auth';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const config = {
  apiKey: appConfig.API_KEY,
  authDomain: appConfig.AUTH_DOMAIN,
  projectId: appConfig.PROJECT_ID,
  storageBucket: appConfig.STORAGE_BUCKET,
  messagingSenderId: appConfig.MESSAGING_SENDER_ID,
  appId: appConfig.APP_ID,
};
const create = (baseURL = appConfig.API_URL || '') => {
  const app = getApps().length > 0 ? getApp() : initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);
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
  const signIn = (body: SignInPayload) =>
    signInWithEmailAndPassword(auth, body.username, body.password);
  const signUp = (body: SignUpPayload) => {
    return createUserWithEmailAndPassword(auth, body.email, body.password);
  };
  const confirmSignUp = (body: User) => {
    return sendEmailVerification(body);
  };
  const saveUserEmail = async (body: User) => {
    const colRef = doc(db, 'my-users', body.uid);
    const initialUser = {
      email: body.email,
      uid: body.uid,
    };
    return setDoc(colRef, initialUser);
  };
  // const resendSignUp = (body: ResendSignUpPayload) => Auth.resendSignUp(body.username);

  // const confirmSignUp = (body: ConfirmSignUpPayload) =>
  //   Auth.confirmSignUp(body.username, body.code);

  const signOut = () => signOutFirebase(auth);

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

  // ====================== Configuration ======================
  const getConfigAdmins = async () => {
    const docRef = doc(db, 'configuration', 'admin');
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  // ====================== Profile ======================
  const getMyProfile = async (body: { uid: string }) => {
    const docRef = doc(db, 'my-users', body.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };
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
    app,
    auth,
    // ====================== Auth ======================
    signUp,
    signOut,
    confirmSignUp,
    signIn,
    saveUserEmail,
    // ====================== Content ======================
    getTodoList,
    getUsers,
    // ====================== Configuration ======================
    getConfigAdmins,
    // ====================== Profile ======================
    getMyProfile,
  };
};

export type Apis = ReturnType<typeof create>;

export default {
  create,
};
