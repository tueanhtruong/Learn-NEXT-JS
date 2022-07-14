import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AdminAccount } from './type';
import { TableParams } from '../type';

export interface IConfigurationState {
  admins: AdminAccount[];
  adminProfile?: AdminAccount;
  loading: boolean;
  error?: Error;
}

const initialState: IConfigurationState = {
  admins: [],
  loading: false,
  error: undefined,
  adminProfile: undefined,
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    ////////////////////////////// ConfigurationAdmin //////////////////////////////
    getConfigurationAdminAction: (state, action: PayloadAction<TableParams | null>) => {
      state.loading = true;
    },
    getConfigurationAdminSuccess: (state, action: PayloadAction<AdminAccount[] | null>) => {
      state.loading = false;
      state.admins = action.payload ?? [];
    },
    getConfigurationAdminFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
    ////////////////////////////// Admin Profile //////////////////////////////
    getAdminProfileAction: (state, action: PayloadAction<{ uid: string }>) => {
      state.loading = true;
    },
    getAdminProfileSuccess: (state, action: PayloadAction<AdminAccount | null>) => {
      state.loading = false;
      state.adminProfile = action.payload ?? undefined;
    },
    getAdminProfileFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ////////////////////////////// ConfigurationAdmin //////////////////////////////
  getConfigurationAdminAction,
  getConfigurationAdminSuccess,
  getConfigurationAdminFailed,
  ////////////////////////////// Admin Profile //////////////////////////////
  getAdminProfileAction,
  getAdminProfileFailed,
  getAdminProfileSuccess,
} = configurationSlice.actions;

export const configurationState = configurationSlice.getInitialState();

export default configurationSlice.reducer;
