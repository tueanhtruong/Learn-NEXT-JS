import { call, takeLatest } from 'redux-saga/effects';
import { Apis } from '../../services/api';
import { callFirebaseApi } from '../commonSagas/callApi';
import {
  getAdminProfileAction,
  getAdminProfileFailed,
  getAdminProfileSuccess,
  getConfigurationAdminAction,
  getConfigurationAdminSuccess,
} from './configurationSlice';

function* getConfigurationAdmin(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getConfigurationAdminSuccess,
      responseExtractor: (response) => {
        console.log('response: ', response);
        return response;
      },
    },
    action.payload
  );
}
function* getAdminProfile(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getAdminProfileSuccess,
      responseExtractor: (response) => response,
      failureAction: getAdminProfileFailed,
    },
    action.payload
  );
}

export default function configurationSaga(apiInstance: Apis) {
  return [
    takeLatest<string, any>(
      getConfigurationAdminAction.type,
      getConfigurationAdmin,
      apiInstance.getConfigAdmins
    ),
    takeLatest<string, any>(
      getAdminProfileAction.type,
      getAdminProfile,
      apiInstance.getAdminProfile
    ),
  ];
}
