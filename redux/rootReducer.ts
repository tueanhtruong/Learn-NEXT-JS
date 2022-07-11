import { combineReducers } from 'redux';
import authSlice, { authState } from './auth/authSlice';
import authReducer, { IAuthState } from './auth/authSlice';
import contentReducer, { contentState, IContentState } from './content/contentSlice';

export interface IRootState {
  content: IContentState;
  auth: IAuthState;
}

export const rootState: IRootState = {
  auth: authState,
  content: contentState,
};

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = () => {
  return combineReducers<IRootState>({
    content: contentReducer,
    auth: authReducer,
  });
};

export default createRootReducer;
