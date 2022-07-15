import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AdminAccount, Banner } from './type';
import { TableParams } from '../type';
import { IRootState } from '../rootReducer';

export interface IConfigurationState {
  admins: AdminAccount[];
  banners: Banner[];
  selectedBanner?: Banner;
  adminProfile?: AdminAccount;
  loading: boolean;
  error?: Error;
  previousBannersParams?: TableParams;
}

const initialState: IConfigurationState = {
  admins: [],
  banners: [],
  loading: false,
  error: undefined,
  adminProfile: undefined,
  selectedBanner: undefined,
};

export const getProfilePreviousBannersParams = (state: IRootState) =>
  state.configuration.previousBannersParams;

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setSelectedBanner: (state, action: PayloadAction<Banner | undefined>) => {
      state.selectedBanner = action.payload;
    },
    ////////////////////////////// Configuration Banner //////////////////////////////
    getConfigurationBannersAction: (state, action: PayloadAction<TableParams>) => {
      state.loading = true;
      state.previousBannersParams = action.payload;
    },
    getConfigurationBannersSuccess: (state, action: PayloadAction<Banner[] | null>) => {
      state.loading = false;
      state.banners = action.payload ?? [];
    },
    getConfigurationBannersFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
    ////////////////////////////// Update Banner //////////////////////////////
    updateConfigurationBannerAction: (state, action: PayloadAction<Banner>) => {
      state.loading = true;
    },
    updateConfigurationBannerSuccess: (state, action: PayloadAction<Banner>) => {
      state.selectedBanner = action.payload;
      state.loading = false;
    },
    updateConfigurationBannerFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
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
    ////////////////////////////// Set Admin Profile //////////////////////////////
    setAdminProfileAction: (state, action: PayloadAction<AdminAccount>) => {
      state.loading = true;
    },
    setAdminProfileSuccess: (state, action: PayloadAction<AdminAccount | null>) => {
      state.loading = false;
    },
    setAdminProfileFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedBanner,
  ////////////////////////////// Update Banner //////////////////////////////
  updateConfigurationBannerAction,
  updateConfigurationBannerFailed,
  updateConfigurationBannerSuccess,
  ////////////////////////////// Configuration Banner //////////////////////////////
  getConfigurationBannersAction,
  getConfigurationBannersFailed,
  getConfigurationBannersSuccess,
  ////////////////////////////// ConfigurationAdmin //////////////////////////////
  getConfigurationAdminAction,
  getConfigurationAdminSuccess,
  getConfigurationAdminFailed,
  ////////////////////////////// Admin Profile //////////////////////////////
  getAdminProfileAction,
  getAdminProfileFailed,
  getAdminProfileSuccess,
  ////////////////////////////// Set Admin Profile //////////////////////////////
  setAdminProfileAction,
  setAdminProfileFailed,
  setAdminProfileSuccess,
} = configurationSlice.actions;

export const configurationState = configurationSlice.getInitialState();

export default configurationSlice.reducer;
