/* global Bugsnag */
import {takeEvery} from 'redux-saga';
import {call} from 'redux-saga/effects';
import {EXCEPTION} from './actions';


export default function* watch() {
  yield takeEvery(EXCEPTION, function* ({payload}) {
    const {message, data} = payload;
    yield call(Bugsnag.notifyException, new Error(message), message, data);
  });
}
