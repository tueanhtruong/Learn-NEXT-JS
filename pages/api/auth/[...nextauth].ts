import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import firebaseClient from '../../../firebase/config';
import * as firestoreFunctions from 'firebase/firestore';
import 'firebase/firestore';
import appConfig from '../../../app-config';
import { getFirestore } from 'firebase/firestore';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/providers/overview
  providers: [
    GoogleProvider({
      clientId: appConfig.GOOGLE_ID ?? '',
      clientSecret: appConfig.GOOGLE_SECRET ?? '',
    }),
  ],
  // callbacks: {
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     console.log('in session callback,', session, token, user);

  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
  // adapter: FirebaseAdapter({
  //   db: getFirestore(firebaseClient.app),
  //   ...firestoreFunctions,
  // }),
  // session: {
  //   strategy: 'jwt',
  // },
});
