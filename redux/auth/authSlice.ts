import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, SignInPayload, SignUpPayload } from './type';
import { User } from 'firebase/auth';

export interface IAuthState {
  isAuthenticated?: boolean;
  authUser?: AuthUser;
  loading: boolean;
  isCorrectRoute: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: undefined,
  authUser: undefined,
  loading: false,
  isCorrectRoute: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsCorrectRoute: (state, action: PayloadAction<boolean>) => {
      state.isCorrectRoute = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<AuthUser | null>) => {
      const user = action.payload;
      state.isAuthenticated = !!user;
      state.authUser = user ?? undefined;
    },
    ////////////////////////////// signInAction //////////////////////////////
    signInAction: (state, action: PayloadAction<SignInPayload | null>) => {
      state.loading = true;
    },
    signInActionSuccess: (state, action: PayloadAction<{ user: User } | null>) => {
      const { user } = action.payload as { user: User };
      state.loading = false;
      state.isAuthenticated = true;
      state.authUser = {
        email: user.email ?? '',
        image: user.photoURL ?? '',
        name: user.displayName ?? '',
        emailPasswordAuthentication: true,
      };
    },
    signInActionFailed: (state) => {
      state.loading = false;
    },
    ////////////////////////////// signUpAction //////////////////////////////
    signUpAction: (state, action: PayloadAction<SignUpPayload | null>) => {
      state.loading = true;
    },
    signUpActionSuccess: (state, action: PayloadAction<{ user: User } | null>) => {
      state.loading = false;
    },
    signUpActionFailed: (state) => {
      state.loading = false;
    },
    ////////////////////////////// signOutAction //////////////////////////////
    signOutAction: (state) => {
      state.loading = true;
    },
    signOutActionSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.authUser = undefined;
    },
    signOutActionFailed: (state) => {
      state.loading = false;
    },
    ////////////////////////////// sendEmailVerificationAction //////////////////////////////
    sendEmailVerificationAction: (state, action: PayloadAction<{ user: User } | null>) => {
      state.loading = true;
    },
    sendEmailVerificationSuccess: (state) => {
      state.loading = false;
    },
    sendEmailVerificationFailed: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthenticated,
  setIsCorrectRoute,
  ////////////////////////////// signInAction //////////////////////////////
  signInAction,
  signInActionFailed,
  signInActionSuccess,
  ////////////////////////////// signUpAction //////////////////////////////
  signUpAction,
  signUpActionSuccess,
  signUpActionFailed,
  ////////////////////////////// sendEmailVerificationAction //////////////////////////////
  sendEmailVerificationAction,
  sendEmailVerificationSuccess,
  sendEmailVerificationFailed,
  ////////////////////////////// signOutAction //////////////////////////////
  signOutAction,
  signOutActionFailed,
  signOutActionSuccess,
} = authSlice.actions;

export const authState = authSlice.getInitialState();

export default authSlice.reducer;
