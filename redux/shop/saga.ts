import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Toastify } from '../../services';
import { Apis } from '../../services/api';
import { callFirebaseApi } from '../commonSagas/callApi';
import { hideModal } from '../modal/modalSlice';
import { TableParams } from '../type';
import {
  getShopItemsAction,
  getShopItemsFailed,
  getShopItemsSuccess,
  getProfilePreviousItemsParams,
  updateShopItemAction,
  updateShopItemFailed,
  updateShopItemSuccess,
} from './shopSlice';
import { Item } from './type';

function* getShopItems(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getShopItemsSuccess,
      responseExtractor: (response) => {
        return response;
      },
      failureAction: getShopItemsFailed,
    },
    action.payload
  );
}
function* updateShopItem(api: any, action: { payload: Item }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: updateShopItemSuccess,
      responseExtractor: (_response) => {
        return action.payload;
      },
      failureAction: updateShopItemFailed,
    },
    action.payload
  );
}
function* handleUpdateItemSuccess(action: { payload: Item }) {
  const { id } = action.payload;
  const params: TableParams = yield select(getProfilePreviousItemsParams);
  yield put(getShopItemsAction(params));
  const isNew = !id;
  Toastify.success(`${isNew ? 'Create' : 'Update'} Item successfully`);
  yield put(hideModal());
}

export default function configurationSaga(apiInstance: Apis) {
  return [
    takeLatest<string, any>(getShopItemsAction.type, getShopItems, apiInstance.getShopItems),
    takeLatest<string, any>(updateShopItemAction.type, updateShopItem, apiInstance.updateShopItem),
    takeLatest<string, any>(updateShopItemSuccess.type, handleUpdateItemSuccess),
  ];
}
