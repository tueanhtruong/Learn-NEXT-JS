import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FileUploadType, GetPresignedPayload } from './type';
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
    uploadFileSuccess: (state, action: PayloadAction<{ callback?: Callback }>) => {
      state.loading = false;
    },
    uploadFileFailed: (state, action: PayloadAction<{ error?: Error; callback?: Callback }>) => {
      state.loading = false;
    },
    /* ------------- getDecodeUrlAction ------------- */
    getDecodeUrlAction: (
      state,
      action: PayloadAction<{ filePath: string | File; callback?: Callback }>
    ) => {
      state.loading = true;
    },
    getDecodeUrlSuccess: (state, action: PayloadAction<{ callback?: Callback }>) => {
      state.loading = false;
    },
    getDecodeUrlFailed: (state, action: PayloadAction<{ error?: Error; callback?: Callback }>) => {
      state.loading = false;
    },
    /* ------------- deleteFileAction ------------- */
    deleteFileAction: (
      state,
      action: PayloadAction<{ filePath: string | File; callback?: Callback }>
    ) => {
      state.loading = true;
    },
    deleteFileSuccess: (state, action: PayloadAction<{ callback?: Callback }>) => {
      state.loading = false;
    },
    deleteFileFailed: (state, action: PayloadAction<{ error?: Error; callback?: Callback }>) => {
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
