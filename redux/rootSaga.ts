import { all } from 'redux-saga/effects';
import { API } from './../services';
/* ------------- Sagas ------------- */

import contentSaga from './content/saga';
import authSaga from './auth/authSaga';
import configurationSaga from './configuration/saga';
import profileSaga from './profile/saga';
import fileSaga from './file/saga';
import shopSaga from './shop/saga';
import orderSaga from './order/saga';

/* ------------- API ------------- */
export const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),
    ...contentSaga(api),
    ...authSaga(api),
    ...configurationSaga(api),
    ...profileSaga(api),
    ...fileSaga(api),
    ...shopSaga(api),
    ...orderSaga(api),
  ]);
}
