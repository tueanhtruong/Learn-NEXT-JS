import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import createRootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export const makeStore = () => store;

export type AppDispatch = typeof store.dispatch;
// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
