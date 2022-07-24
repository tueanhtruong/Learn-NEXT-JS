import { UploadResult } from 'firebase/storage';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Toastify } from '../../services';
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
  uploadFilesAction,
  uploadFilesSuccess,
  uploadFileSuccess,
} from './fileSlice';
import { GetMultiPresignedPayload, GetPresignedPayload } from './type';

function* handleUploadFile(api: any, action: { payload: GetPresignedPayload }) {
  const { fileName, contentType, fileData, type, callback, keepOriginalQuality } = action.payload;
  const compressedFile: File | Blob = yield call(
    compressFile as any,
    fileData,
    keepOriginalQuality
  );
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

function* handleUploadMultiFiles(api: any, action: { payload: GetMultiPresignedPayload }) {
  const files = action.payload.files;
  const responses: string[] = yield all(
    files.map((file) => {
      const payload = file;
      if (typeof payload.url === 'string') return payload.url;
      return call(uploadSingleFile, api, payload);
    })
  );

  const callback = action.payload.callback;
  if (callback) {
    const formatResponse = responses.reduce((state, item, idx) => {
      // eslint-disable-next-line security/detect-object-injection
      const newItemImage = { [files[idx].keyId || '']: item };
      return { ...state, ...newItemImage };
    }, {});
    callback(formatResponse);
  }
  yield put(uploadFilesSuccess({}));
}

function* uploadSingleFile(api: any, payload: GetPresignedPayload) {
  try {
    const { fileName, contentType, fileData, type, callback, keepOriginalQuality } = payload;
    const compressedFile: File | Blob = yield call(
      compressFile as any,
      fileData,
      keepOriginalQuality
    );
    const filePayload = {
      fileName: `${type}/${getRandomId()}-${fileName}`,
      contentType,
      type,
      fileData: compressedFile,
      callback,
    };

    const {
      metadata: { fullPath },
    }: UploadResult = yield call(api, filePayload);

    return fullPath;
  } catch (error) {
    Toastify.error(`Error while uploading file. Please try again.`);
    return '';
  }
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
    takeLatest<string, any>(uploadFilesAction.type, handleUploadMultiFiles, apiInstance.uploadFile),
    takeLatest<string, any>(uploadFileSuccess.type, handleUploadFileSuccess),
    takeEvery<string, any>(getDecodeUrlAction.type, handleGetDecodeUrl, apiInstance.getDecodeUrl),
    takeEvery<string, any>(getDecodeUrlSuccess.type, handleGetDecodeUrlSuccess),
  ];
}
