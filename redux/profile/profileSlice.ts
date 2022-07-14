import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Profile } from './type';
import { Callback, TableParams } from '../type';
import { signOutActionSuccess } from '../auth/authSlice';

export interface IProfileState {
  myProfile?: Profile;
  userProfiles: Profile[];
  loading: boolean;
  error?: Error;
}

const initialState: IProfileState = {
  myProfile: undefined,
  loading: false,
  error: undefined,
  userProfiles: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
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
      action: PayloadAction<{ payload: Profile; callback?: Callback }>
    ) => {
      state.loading = true;
    },
    updateMyProfileSuccess: (
      state,
      action: PayloadAction<{ payload: Profile; callback?: Callback }>
    ) => {
      state.loading = false;
      state.myProfile = action.payload.payload ?? undefined;
    },
    updateMyProfileFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload ?? undefined;
    },
    ////////////////////////////// getSystemUsers //////////////////////////////
    getSystemUsersAction: (state, action: PayloadAction<TableParams>) => {
      state.loading = true;
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
