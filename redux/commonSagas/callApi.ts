import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import _ from 'lodash';
import { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

const sanitizeActionType = (actionType: string) =>
  actionType.split('/').pop()?.replace('_REQUEST', '').replaceAll('_', ' ');

export function* callApi<TResponse extends unknown = any, TError extends Error = Error>(
  api: any,
  action: {
    successAction: ActionCreatorWithoutPayload | ActionCreatorWithPayload<any>;
    responseExtractor?: (res: any) => TResponse;
    failureAction?: ActionCreatorWithoutPayload | ActionCreatorWithPayload<any>;
    errorBuilder?: (err: any) => any;
    onFailure?: Saga;
  },
  ...args: any[]
) {
  const {
    successAction,
    responseExtractor = undefined,
    errorBuilder = (err) => err,
    failureAction,
    onFailure,
  } = action;
  const response: ApiResponse<{ data: any }> = yield call(api, ...args);
  if (response.ok) {
    yield put(successAction(responseExtractor?.(response.data)));
  } else {
    if (failureAction) yield put(failureAction(errorBuilder(response.data)));

    if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
      console.error('Connection timeout. Please check your network and try again.');
    }
    if (onFailure) {
      yield call(
        onFailure,
        response,
        `${sanitizeActionType(failureAction?.name || '')}: ${
          _.get(response.data, 'details.message') || _.get(response.data, 'message')
        }`
      );
    }
  }
}

// export function* callAuth<TResponse extends unknown = any, TError extends Error = Error>(
//   api,
//   action: {
//     asyncAction: AsyncActionCreatorBuilder<
//       any,
//       [string, [TResponse, any]],
//       [string, [TError, any]]
//     >;
//     responseExtractor?: (res) => TResponse;
//     errorBuilder?: (err) => any;
//   },
//   ...args: any[]
// ) {
//   const { asyncAction, responseExtractor = undefined, errorBuilder = (err) => err } = action;
//   try {
//     const response = yield call(api, ...args);
//     yield put(asyncAction.success(responseExtractor?.(response), undefined));
//   } catch (err) {
//     yield put(asyncAction.failure(errorBuilder(err), undefined));
//   }
// }
