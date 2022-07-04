import { all } from 'redux-saga/effects';
import { API } from './../services';
/* ------------- Sagas ------------- */

import contentSaga from './content/saga';

/* ------------- API ------------- */
export const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),
    ...contentSaga(api),
  ]);
}
