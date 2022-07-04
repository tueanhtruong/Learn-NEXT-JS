import { call, takeLatest } from 'redux-saga/effects';
import { Apis } from '../../services/api';
import { callApi } from '../commonSagas/callApi';
import { getTodoListAction, getTodoListActionSuccess } from './contentSlice';

function* getTodoList(api: any, action: { payload: any }) {
  yield call(
    callApi,
    api,
    { successAction: getTodoListActionSuccess, responseExtractor: (response) => response },
    action.payload
  );
}

export default function contentSaga(apiInstance: Apis) {
  return [takeLatest<string, any>(getTodoListAction().type, getTodoList, apiInstance.getTodoList)];
}
