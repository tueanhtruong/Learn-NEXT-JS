// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import appConfig from '../app-config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: appConfig.API_KEY,
  authDomain: appConfig.AUTH_DOMAIN,
  projectId: appConfig.PROJECT_ID,
  storageBucket: appConfig.STORAGE_BUCKET,
  messagingSenderId: appConfig.MESSAGING_SENDER_ID,
  appId: appConfig.APP_ID,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(config);

const db = getFirestore(app);

const storage = getStorage(app);

export default { config, app, db, storage };
