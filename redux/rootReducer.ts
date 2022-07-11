import { combineReducers } from 'redux';
import authReducer, { IAuthState, authState } from './auth/authSlice';
import configurationReducer, {
  configurationState,
  IConfigurationState,
} from './configuration/configurationSlice';
import contentReducer, { contentState, IContentState } from './content/contentSlice';
import profileReducer, { IProfileState, profileState } from './profile/profileSlice';

export interface IRootState {
  content: IContentState;
  auth: IAuthState;
  configuration: IConfigurationState;
  profile: IProfileState;
}

export const rootState: IRootState = {
  auth: authState,
  content: contentState,
  configuration: configurationState,
  profile: profileState,
};

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = () => {
  return combineReducers<IRootState>({
    content: contentReducer,
    auth: authReducer,
    configuration: configurationReducer,
    profile: profileReducer,
  });
};

export default createRootReducer;
