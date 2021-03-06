import { combineReducers } from 'redux';
import authReducer, { IAuthState, authState } from './auth/authSlice';
import configurationReducer, {
  configurationState,
  IConfigurationState,
} from './configuration/configurationSlice';
import contentReducer, { contentState, IContentState } from './content/contentSlice';
import profileReducer, { IProfileState, profileState } from './profile/profileSlice';
import modalReducer, { IModalState, modalState } from './modal/modalSlice';
import fileReducer, { IFileState, fileState } from './file/fileSlice';
import shopReducer, { IShopState, shopState } from './shop/shopSlice';
import orderReducer, { IOrderState, orderState } from './order/orderSlice';

export interface IRootState {
  content: IContentState;
  auth: IAuthState;
  configuration: IConfigurationState;
  profile: IProfileState;
  modal: IModalState;
  file: IFileState;
  shop: IShopState;
  order: IOrderState;
}

export const rootState: IRootState = {
  auth: authState,
  content: contentState,
  configuration: configurationState,
  profile: profileState,
  modal: modalState,
  file: fileState,
  shop: shopState,
  order: orderState,
};

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = () => {
  return combineReducers<IRootState>({
    content: contentReducer,
    auth: authReducer,
    configuration: configurationReducer,
    profile: profileReducer,
    modal: modalReducer,
    file: fileReducer,
    shop: shopReducer,
    order: orderReducer,
  });
};

export default createRootReducer;
