import { call, takeLatest } from 'redux-saga/effects';
import { Apis } from '../../services/api';
import { callFirebaseApi } from '../commonSagas/callApi';
import { getMyProfileAction, getMyProfileFailed, getMyProfileSuccess } from './profileSlice';

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

export default function configurationSaga(apiInstance: Apis) {
  return [takeLatest<string, any>(getMyProfileAction.type, getMyProfile, apiInstance.getMyProfile)];
}
