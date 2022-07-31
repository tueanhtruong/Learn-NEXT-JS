import { call, select, takeLatest } from 'redux-saga/effects';
import { Apis } from '../../services/api';
import toastify from '../../services/toastify';
import { callFirebaseApi } from '../commonSagas/callApi';
import {
  addOrderItemAction,
  addOrderItemFailed,
  addOrderItemSuccess,
  getCurrentOrderItems,
  getOrderItemsAction,
  getOrderItemsFailed,
  getOrderItemsSuccess,
} from './orderSlice';
import { OrderItem } from './type';

function* getOrderItems(api: any, action: { payload: any }) {
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getOrderItemsSuccess,
      responseExtractor: (response) => {
        return response;
      },
      failureAction: getOrderItemsFailed,
    },
    action.payload
  );
}
function* addOrderItem(api: any, action: { payload: { item: OrderItem; id: string } }) {
  const { id, item } = action.payload;
  const currentOrders: OrderItem[] = yield select(getCurrentOrderItems);
  const newOrders = [...currentOrders, item];
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: addOrderItemSuccess,
      responseExtractor: (_response) => {
        return action.payload;
      },
      failureAction: addOrderItemFailed,
    },
    { items: newOrders, id }
  );
}

function handleAddOrderItemSuccess(_action: { payload: { item: OrderItem; id: string } }) {
  // const { id } = action.payload;
  // yield put(getOrderItemsAction({ id }));
  toastify.success(`Add to Cart successfully`);
}

export default function configurationSaga(apiInstance: Apis) {
  return [
    takeLatest<string, any>(getOrderItemsAction.type, getOrderItems, apiInstance.getMyOrderItems),
    takeLatest<string, any>(addOrderItemAction.type, addOrderItem, apiInstance.addToMyOrderItems),
    takeLatest<string, any>(addOrderItemSuccess.type, handleAddOrderItemSuccess),
  ];
}
