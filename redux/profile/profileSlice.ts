import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Profile } from './type';

export interface IProfileState {
  myProfile?: Profile;
  loading: boolean;
  error?: Error;
}

const initialState: IProfileState = {
  myProfile: undefined,
  loading: false,
  error: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
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
  },
});

// Action creators are generated for each case reducer function
export const { getMyProfileAction, getMyProfileSuccess, getMyProfileFailed } = profileSlice.actions;

export const profileState = profileSlice.getInitialState();

export default profileSlice.reducer;
