import { call, takeLatest } from 'redux-saga/effects';
import { Apis } from '../../services/api';
import { callFirebaseApi } from '../commonSagas/callApi';
import { getConfigurationAdminAction, getConfigurationAdminSuccess } from './configurationSlice';

function* getConfigurationAdmin(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getConfigurationAdminSuccess,
      responseExtractor: (response) => {
        return response.accounts;
      },
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
  ];
}
