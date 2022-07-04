import { combineReducers } from 'redux';
import contentReducer, { IContentState } from './content/contentSlice';

export interface IRootState {
  content: IContentState;
}

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = () =>
  combineReducers<IRootState>({
    content: contentReducer,
  });

export default createRootReducer;
