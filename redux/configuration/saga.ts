import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Toastify } from '../../services';
import { Apis } from '../../services/api';
import { callFirebaseApi } from '../commonSagas/callApi';
import { hideModal } from '../modal/modalSlice';
import { TableParams } from '../type';
import {
  getAdminProfileAction,
  getAdminProfileFailed,
  getAdminProfileSuccess,
  getConfigurationAdminAction,
  getConfigurationAdminSuccess,
  getConfigurationBannersAction,
  getConfigurationBannersFailed,
  getConfigurationBannersSuccess,
  getProfilePreviousBannersParams,
  setAdminProfileAction,
  setAdminProfileFailed,
  setAdminProfileSuccess,
  updateConfigurationBannerAction,
  updateConfigurationBannerFailed,
  updateConfigurationBannerSuccess,
} from './configurationSlice';
import { Banner } from './type';

function* getConfigurationAdmin(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getConfigurationAdminSuccess,
      responseExtractor: (response) => {
        return response;
      },
    },
    action.payload
  );
}
function* getConfigurationBanners(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getConfigurationBannersSuccess,
      responseExtractor: (response) => {
        return response;
      },
      failureAction: getConfigurationBannersFailed,
    },
    action.payload
  );
}
function* updateConfigurationBanner(api: any, action: { payload: Banner }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: updateConfigurationBannerSuccess,
      responseExtractor: (response) => {
        return action.payload;
      },
      failureAction: updateConfigurationBannerFailed,
    },
    action.payload
  );
}
function* handleUpdateBannerSuccess(action: { payload: Banner }) {
  const { id } = action.payload;
  const params: TableParams = yield select(getProfilePreviousBannersParams);
  yield put(getConfigurationBannersAction(params));
  const isNew = !id;
  Toastify.success(`${isNew ? 'Create' : 'Update'} Banner successfully`);
  yield put(hideModal());
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
function* setAdminProfile(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: setAdminProfileSuccess,
      responseExtractor: (response) => response,
      failureAction: setAdminProfileFailed,
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
      getConfigurationBannersAction.type,
      getConfigurationBanners,
      apiInstance.getConfigurationBanners
    ),
    takeLatest<string, any>(
      updateConfigurationBannerAction.type,
      updateConfigurationBanner,
      apiInstance.updateConfigurationBanner
    ),
    takeLatest<string, any>(
      getAdminProfileAction.type,
      getAdminProfile,
      apiInstance.getAdminProfile
    ),
    takeLatest<string, any>(
      setAdminProfileAction.type,
      setAdminProfile,
      apiInstance.setAdminProfile
    ),
    takeLatest<string, any>(updateConfigurationBannerSuccess.type, handleUpdateBannerSuccess),
  ];
}
