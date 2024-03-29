import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Apis } from '@/services/api';
import { callFirebaseApi } from '../commonSagas/callApi';
import { TableParams } from '../type';
import {
  getMyProfileAction,
  getMyProfileFailed,
  getMyProfileSuccess,
  getProfilePreviousParams,
  getSystemUsersAction,
  getSystemUsersFailed,
  getSystemUsersSuccess,
  updateMyProfileAction,
  updateMyProfileFailed,
  updateMyProfileSuccess,
} from './profileSlice';

function* getMyProfile(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getMyProfileSuccess,
      responseExtractor: (response) => response,
      failureAction: getMyProfileFailed,
    },
    action.payload
  );
}

function* getSystemUsers(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getSystemUsersSuccess,
      responseExtractor: (response) => {
        return response;
      },
      failureAction: getSystemUsersFailed,
    },
    action.payload
  );
}

function* updateMyProfile(api: any, action: { payload: any }) {
  const { payload, callback, isAdminAction } = action.payload;
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: updateMyProfileSuccess,
      responseExtractor: (response) => ({
        callback,
        payload,
        isAdminAction,
      }),
      failureAction: updateMyProfileFailed,
    },
    payload
  );
}

function* updateProfileSuccess(action: any) {
  const { callback, isAdminAction } = action.payload;
  if (callback) callback();
  if (isAdminAction) {
    const params: TableParams = yield select(getProfilePreviousParams);
    yield put(getSystemUsersAction(params));
  }
}

export default function configurationSaga(apiInstance: Apis) {
  return [
    takeLatest<string, any>(getMyProfileAction.type, getMyProfile, apiInstance.getMyProfile),
    takeLatest<string, any>(getSystemUsersAction.type, getSystemUsers, apiInstance.getSystemUsers),
    takeLatest<string, any>(
      updateMyProfileAction.type,
      updateMyProfile,
      apiInstance.updateMyProfile
    ),
    takeLatest<string, any>(updateMyProfileSuccess.type, updateProfileSuccess),
  ];
}
