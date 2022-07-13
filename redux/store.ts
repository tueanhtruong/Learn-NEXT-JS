import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import createRootReducer, { rootState } from './rootReducer';
// import {
//   sendEmailVerificationAction,
//   signInActionFailed,
//   signInActionSuccess,
//   signUpActionFailed,
//   signUpActionSuccess,
// } from './auth/authSlice';
// import { hideModal, showModal } from './modal/modalSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [
      //     signInActionSuccess.type,
      //     signInActionFailed.type,
      //     sendEmailVerificationAction.type,
      //     signUpActionSuccess.type,
      //     signUpActionFailed.type,
      //     showModal.type,
      //     hideModal.type,
      //   ],
      // },
    }).concat(sagaMiddleware),
  devTools: true,
  preloadedState: rootState,
});

sagaMiddleware.run(rootSaga);

export const makeStore = () => store;

export type AppDispatch = typeof store.dispatch;
// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
