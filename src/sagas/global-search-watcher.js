import {takeLatest, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';

import {INPUT_CHANGE, clear, setSearchedFlag} from '../modules/global-search/actions';
import {getSearchedFlag} from '../modules/global-search/selectors';
import {navigate, replace, goBack} from '../modules/navigation/actions';


export default function* watch() {
  yield* takeLatest(INPUT_CHANGE, function* ({payload}) {
    yield call(delay, 30);

    try {
      if (payload === '') {
        yield put(goBack());
        yield put(clear());
        return;
      }

      const state = yield select();
      const path = `/haku?search=${payload}`;

      if (getSearchedFlag(state)) {
        yield put(replace(path));
      } else {
        yield put(setSearchedFlag());
        yield put(navigate(path));
      }
    } catch (er) {
      console.warn(er);
    }
  });
}
