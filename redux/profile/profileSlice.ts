import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Profile } from './type';
import { Callback, TableParams } from '../type';
import { signOutActionSuccess } from '../auth/authSlice';
import { IRootState } from '../rootReducer';

export interface IProfileState {
  myProfile?: Profile;
  userProfiles: Profile[];
  selectedProfile?: Profile;
  previousParams?: TableParams;
  loading: boolean;
  error?: Error;
}

const initialState: IProfileState = {
  myProfile: undefined,
  loading: false,
  selectedProfile: undefined,
  error: undefined,
  previousParams: undefined,
  userProfiles: [],
};

export const getProfilePreviousParams = (state: IRootState) => state.profile.previousParams;

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setSelectedProfile: (state, action: PayloadAction<Profile>) => {
      state.selectedProfile = action.payload;
    },
    ////////////////////////////// getMyProfile //////////////////////////////
    getMyProfileAction: (state, action: PayloadAction<{ uid: string }>) => {
      state.loading = true;
    },
    getMyProfileSuccess: (state, action: PayloadAction<Profile | null>) => {
      state.loading = false;
      state.myProfile = action.payload ?? undefined;
    },
    getMyProfileFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
    ////////////////////////////// updateMyProfile //////////////////////////////
    updateMyProfileAction: (
      state,
      action: PayloadAction<{ payload: Profile; callback?: Callback; isAdminAction?: boolean }>
    ) => {
      state.loading = true;
    },
    updateMyProfileSuccess: (
      state,
      action: PayloadAction<{ payload: Profile; callback?: Callback; isAdminAction?: boolean }>
    ) => {
      const { payload, isAdminAction } = action.payload;
      state.loading = false;
      if (!isAdminAction) {
        state.myProfile = payload ?? undefined;
      }
    },
    updateMyProfileFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
    ////////////////////////////// getSystemUsers //////////////////////////////
    getSystemUsersAction: (state, action: PayloadAction<TableParams>) => {
      state.loading = true;
      state.previousParams = action.payload;
    },
    getSystemUsersSuccess: (state, action: PayloadAction<Profile[]>) => {
      state.loading = false;
      state.userProfiles = action.payload ?? [];
    },
    getSystemUsersFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
  },
  extraReducers: {
    [signOutActionSuccess.type]: (state) => {
      state.myProfile = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedProfile,
  ////////////////////////////// getMyProfile //////////////////////////////
  getMyProfileAction,
  getMyProfileSuccess,
  getMyProfileFailed,
  ////////////////////////////// updateMyProfile //////////////////////////////
  updateMyProfileAction,
  updateMyProfileSuccess,
  updateMyProfileFailed,
  ////////////////////////////// getSystemUsers //////////////////////////////
  getSystemUsersAction,
  getSystemUsersSuccess,
  getSystemUsersFailed,
} = profileSlice.actions;

export const profileState = profileSlice.getInitialState();

export default profileSlice.reducer;
