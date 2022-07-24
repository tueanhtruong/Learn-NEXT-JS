import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FileUploadType, GetMultiPresignedPayload, GetPresignedPayload } from './type';
import { Callback } from '../type';

export interface IFileState {
  loading: boolean;
  url: string;
  error?: Error;
  documentType?: FileUploadType;
}

const initialState: IFileState = {
  loading: false,
  url: '',
  error: undefined,
  documentType: undefined,
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    /* ------------- uploadFileAction ------------- */
    uploadFileAction: (state, action: PayloadAction<GetPresignedPayload>) => {
      state.documentType = action.payload.type ?? undefined;
      state.loading = true;
    },
    uploadFileSuccess: (state, _action: PayloadAction<{ callback?: Callback }>) => {
      state.loading = false;
    },
    uploadFileFailed: (state, _action: PayloadAction<{ error?: Error; callback?: Callback }>) => {
      state.loading = false;
    },
    /* ------------- uploadFilesAction ------------- */
    uploadFilesAction: (state, _action: PayloadAction<GetMultiPresignedPayload>) => {
      state.loading = true;
    },
    uploadFilesSuccess: (state, _action: PayloadAction<{ callback?: Callback }>) => {
      state.loading = false;
    },
    uploadFilesFailed: (state, _action: PayloadAction<{ error?: Error; callback?: Callback }>) => {
      state.loading = false;
    },
    /* ------------- getDecodeUrlAction ------------- */
    getDecodeUrlAction: (
      state,
      _action: PayloadAction<{ filePath: string | File; callback?: Callback }>
    ) => {
      state.loading = true;
    },
    getDecodeUrlSuccess: (state, _action: PayloadAction<{ callback?: Callback }>) => {
      state.loading = false;
    },
    getDecodeUrlFailed: (state, _action: PayloadAction<{ error?: Error; callback?: Callback }>) => {
      state.loading = false;
    },
    /* ------------- deleteFileAction ------------- */
    deleteFileAction: (
      state,
      _action: PayloadAction<{ filePath: string | File; callback?: Callback }>
    ) => {
      state.loading = true;
    },
    deleteFileSuccess: (state, _action: PayloadAction<{ callback?: Callback }>) => {
      state.loading = false;
    },
    deleteFileFailed: (state, _action: PayloadAction<{ error?: Error; callback?: Callback }>) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  /* ------------- uploadFileAction ------------- */
  uploadFileAction,
  uploadFileFailed,
  uploadFileSuccess,
  /* ------------- uploadFilesAction ------------- */
  uploadFilesAction,
  uploadFilesFailed,
  uploadFilesSuccess,
  /* ------------- getDecodeUrlAction ------------- */
  getDecodeUrlAction,
  getDecodeUrlFailed,
  getDecodeUrlSuccess,
  /* ------------- deleteFileAction ------------- */
  deleteFileAction,
  deleteFileFailed,
  deleteFileSuccess,
} = fileSlice.actions;

export const fileState = fileSlice.getInitialState();

export default fileSlice.reducer;
