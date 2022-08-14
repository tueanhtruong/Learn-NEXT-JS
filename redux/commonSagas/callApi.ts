/* eslint-disable no-unused-vars */
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import { UploadResult } from 'firebase/storage';
import _ from 'lodash';
import { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { Toastify } from '@/services';

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
    if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
      Toastify.error('Connection timeout. Please check your network and try again.');
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

export function* callFileApi<TResponse extends unknown = any, TError extends Error = Error>(
  api: any,
  action: {
    successAction: ActionCreatorWithoutPayload | ActionCreatorWithPayload<any>;
    responseExtractor?: (_res: any) => TResponse;
    failureAction?: ActionCreatorWithoutPayload | ActionCreatorWithPayload<any>;
    errorBuilder?: (_err: any) => any;
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
  try {
    const response: UploadResult = yield call(api, ...args);
    if (response?.metadata) {
      yield put(successAction(responseExtractor?.(response.metadata)));
    } else if (failureAction) {
      yield put(failureAction(errorBuilder(response)));
    }
  } catch (err: any) {
    if (failureAction) yield put(failureAction(errorBuilder(err)));
    if (err.message) {
      Toastify.error(err.message);
    }
  }
}

export function* callFirebaseApi<TResponse extends unknown = any, TError extends Error = Error>(
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
  try {
    const response: ApiResponse<{ data: any }> = yield call(api, ...args);
    yield put(successAction(responseExtractor?.(response)));
  } catch (err: any) {
    console.log('err: ', err);
    if (failureAction) yield put(failureAction(errorBuilder(err)));
    if (err.message) {
      Toastify.error(err.message);
    }
  }
}

export function* callAuth<TResponse extends unknown = any, TError extends Error = Error>(
  api: any,
  action: {
    successAction: ActionCreatorWithoutPayload | ActionCreatorWithPayload<any>;
    responseExtractor?: (res: any) => TResponse;
    failureAction?: ActionCreatorWithoutPayload | ActionCreatorWithPayload<any>;
    errorBuilder?: (err: any) => any;
  },
  ...args: any[]
) {
  const {
    successAction,
    failureAction,
    responseExtractor = undefined,
    errorBuilder = (err) => err,
  } = action;
  try {
    const response: ApiResponse<{ data: any }> = yield call(api, ...args);
    yield put(successAction(responseExtractor?.(response)));
  } catch (err: any) {
    if (failureAction) yield put(failureAction(errorBuilder(err)));
    if (err.message) {
      Toastify.error(err.message);
    }
  }
}
