import apisauce from 'apisauce';
import appConfig from '../app-config';
import { ConfirmSignUpPayload, SignInPayload, SignUpPayload } from '../redux/auth/type';

import { getRandomId, newCancelToken } from '../utils';
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
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Profile } from '../redux/profile/type';
import { GetPresignedPayload } from '../redux/file/type';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { TableParams } from '../redux/type';
import { AdminAccount, Banner } from '../redux/configuration/type';
import { COLLECTIONS } from '../app-config/constants';
import { Item } from '../redux/shop/type';

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
  const storage = getStorage();
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
    const colRef = doc(db, COLLECTIONS._myUsers, body.uid);
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
    const querySnapshot = await getDocs(collection(db, COLLECTIONS._configurationAdmin));
    const res: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  };
  const getAdminProfile = async (body: { uid: string }) => {
    const docRef = doc(db, COLLECTIONS._configurationAdmin, body.uid);
    const docSnap = await getDoc(docRef);
    const isExists = docSnap.exists();
    if (isExists) return docSnap.data();
    return undefined;
  };
  const setAdminProfile = async (body: AdminAccount) => {
    const docRef = doc(db, COLLECTIONS._configurationAdmin, body.uid);
    if (body.isAdmin) return setDoc(docRef, body);
    return deleteDoc(docRef);
  };

  const getConfigurationBanners = async (body: TableParams) => {
    const colRef = collection(db, COLLECTIONS._configurationBanners);
    const queryParams = [];
    if (body.sort) queryParams.push(orderBy(body.sort, body.order ?? 'asc'));
    const q = query(colRef, ...queryParams);
    const querySnapshot = await getDocs(q);
    const res: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  };

  const updateConfigurationBanner = async (body: Banner) => {
    const isNewBanner = !body.id;
    if (isNewBanner) {
      const id = getRandomId();
      const docRef = doc(db, COLLECTIONS._configurationBanners, id);
      return setDoc(docRef, { ...body, id });
    }
    const docRef = doc(db, COLLECTIONS._configurationBanners, body.id ?? '');
    return updateDoc(docRef, { ...body });
  };

  // ====================== Shop ======================
  const getShopItems = async (body: TableParams) => {
    const colRef = collection(db, COLLECTIONS._shopItems);
    const queryParams = [];
    if (body.sort) queryParams.push(orderBy(body.sort, body.order ?? 'asc'));
    const q = query(colRef, ...queryParams);
    const querySnapshot = await getDocs(q);
    const res: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  };

  const updateShopItem = async (body: Item) => {
    const isNewItem = !body.id;
    if (isNewItem) {
      const id = getRandomId();
      const docRef = doc(db, COLLECTIONS._shopItems, id);
      return setDoc(docRef, { ...body, id });
    }
    const docRef = doc(db, COLLECTIONS._shopItems, body.id ?? '');
    return updateDoc(docRef, { ...body });
  };
  // ====================== Profile ======================
  const getMyProfile = async (body: { uid: string }) => {
    const docRef = doc(db, COLLECTIONS._myUsers, body.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };
  const getSystemUsers = async (body: TableParams) => {
    const colRef = collection(db, COLLECTIONS._myUsers);
    const queryParams = [];
    if (body.sort) queryParams.push(orderBy(body.sort, body.order ?? 'asc'));
    const q = query(colRef, ...queryParams);
    const querySnapshot = await getDocs(q);
    const res: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  };
  const updateMyProfile = async (body: Profile) => {
    const docRef = doc(db, COLLECTIONS._myUsers, body.uid);
    return updateDoc(docRef, { ...body });
  };
  // ====================== File ======================
  const uploadFile = (body: GetPresignedPayload) => {
    const storageRef = ref(storage, body.fileName);
    return body.fileData && uploadBytes(storageRef, body.fileData);
  };
  const getDecodeUrl = (body: string) => {
    const storageRef = ref(storage, body);
    return getDownloadURL(storageRef);
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
    getAdminProfile,
    setAdminProfile,
    getConfigurationBanners,
    updateConfigurationBanner,
    // ====================== Shop ======================
    getShopItems,
    updateShopItem,
    // ====================== Profile ======================
    getMyProfile,
    updateMyProfile,
    getSystemUsers,
    // ====================== File ======================
    uploadFile,
    getDecodeUrl,
  };
};

export type Apis = ReturnType<typeof create>;

export default {
  create,
};
