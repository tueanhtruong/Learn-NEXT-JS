import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AdminAccount } from './type';

export interface IConfigurationState {
  admins: AdminAccount[];
  loading: boolean;
  error?: Error;
}

const initialState: IConfigurationState = {
  admins: [],
  loading: false,
  error: undefined,
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    ////////////////////////////// ConfigurationAdmin //////////////////////////////
    getConfigurationAdminAction: (state) => {
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
  },
});

// Action creators are generated for each case reducer function
export const {
  getConfigurationAdminAction,
  getConfigurationAdminSuccess,
  getConfigurationAdminFailed,
} = configurationSlice.actions;

export const configurationState = configurationSlice.getInitialState();

export default configurationSlice.reducer;
