import { call, takeLatest } from 'redux-saga/effects';
import { Apis } from '@/services/api';
import { callAuth } from '../commonSagas/callApi';
import {
  sendEmailVerificationAction,
  sendEmailVerificationFailed,
  sendEmailVerificationSuccess,
  signInAction,
  signInActionFailed,
  signInActionSuccess,
  signOutAction,
  signOutActionFailed,
  signOutActionSuccess,
  signUpAction,
  signUpActionFailed,
  signUpActionSuccess,
} from './authSlice';

function* handleSignUp(api: any, action: { payload: any }) {
  yield call(
    callAuth,
    api,
    {
      successAction: signUpActionSuccess,
      responseExtractor: (response) => response,
      failureAction: signUpActionFailed,
    },
    action.payload
  );
}

function* handleSignIn(api: any, action: { payload: any }) {
  yield call(
    callAuth,
    api,
    {
      successAction: signInActionSuccess,
      responseExtractor: (response) => response,
      failureAction: signInActionFailed,
    },
    action.payload
  );
}

function* handleSignOut(api: any, action: { payload: any }) {
  yield call(
    callAuth,
    api,
    {
      successAction: signOutActionSuccess,
      responseExtractor: (response) => response,
      failureAction: signOutActionFailed,
    },
    action.payload
  );
}

function* handleSignUpSuccess(api: any, action: { payload: { user: any } }) {
  const { user } = action.payload;
  yield call(
    callAuth,
    api,
    {
      successAction: sendEmailVerificationAction,
      responseExtractor: () => ({ user }),
      failureAction: signOutActionFailed,
    },
    user
  );
  // yield put(sendEmailVerificationAction({ user }));
}

function* handleSendEmailVerification(api: any, action: { payload: { user: any } }) {
  const { user } = action.payload;
  yield call(
    callAuth,
    api,
    {
      successAction: sendEmailVerificationSuccess,
      responseExtractor: (response) => response,
      failureAction: sendEmailVerificationFailed,
    },
    user
  );
}

export default function contentSaga(apiInstance: Apis) {
  return [
    takeLatest<string, any>(signUpAction.type, handleSignUp, apiInstance.signUp),
    takeLatest<string, any>(signInAction.type, handleSignIn, apiInstance.signIn),
    takeLatest<string, any>(signOutAction.type, handleSignOut, apiInstance.signOut),
    takeLatest<string, any>(
      signUpActionSuccess.type,
      handleSignUpSuccess,
      apiInstance.saveUserEmail
    ),
    takeLatest<string, any>(
      sendEmailVerificationAction.type,
      handleSendEmailVerification,
      apiInstance.confirmSignUp
    ),
  ];
}
