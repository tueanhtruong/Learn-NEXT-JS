import { call, takeLatest } from 'redux-saga/effects';
import { Apis } from '../../services/api';
import { compressFile, getRandomId } from '../../utils';
import { callFileApi, callFirebaseApi } from '../commonSagas/callApi';
import { Callback } from '../type';
import {
  getDecodeUrlAction,
  getDecodeUrlFailed,
  getDecodeUrlSuccess,
  uploadFileAction,
  uploadFileFailed,
  uploadFileSuccess,
} from './fileSlice';
import { GetPresignedPayload } from './type';

function* handleUploadFile(api: any, action: { payload: GetPresignedPayload }) {
  const { fileName, contentType, fileData, type, callback } = action.payload;
  const compressedFile: File | Blob = yield call(compressFile as any, fileData);
  const payload = {
    fileName: `${type}/${getRandomId()}-${fileName}`,
    contentType,
    type,
    fileData: compressedFile,
    callback,
  };
  yield call(
    callFileApi,
    api,
    {
      successAction: uploadFileSuccess,
      responseExtractor: (response) => ({ ...response, ...payload }),
      failureAction: uploadFileFailed,
    },
    payload
  );
}

function* handleGetDecodeUrl(
  api: any,
  action: { payload: { filePath: string | File; callback?: Callback } }
) {
  const { filePath, callback } = action.payload;
  yield call(
    callFirebaseApi,
    api,
    {
      successAction: getDecodeUrlSuccess,
      responseExtractor: (response) => ({ fullPath: response, callback }),
      failureAction: getDecodeUrlFailed,
    },
    filePath
  );
}

function handleUploadFileSuccess(action: { payload: GetPresignedPayload }) {
  const { fullPath = '', callback } = action.payload;
  if (callback) {
    callback(fullPath || '');
  }
}

function handleGetDecodeUrlSuccess(action: { payload: GetPresignedPayload }) {
  const { fullPath = '', callback } = action.payload;
  if (callback) {
    callback(fullPath || '');
  }
}

export default function contentSaga(apiInstance: Apis) {
  return [
    takeLatest<string, any>(uploadFileAction.type, handleUploadFile, apiInstance.uploadFile),
    takeLatest<string, any>(uploadFileSuccess.type, handleUploadFileSuccess),
    takeLatest<string, any>(getDecodeUrlAction.type, handleGetDecodeUrl, apiInstance.getDecodeUrl),
    takeLatest<string, any>(getDecodeUrlSuccess.type, handleGetDecodeUrlSuccess),
  ];
}
