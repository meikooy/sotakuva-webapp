import {takeEvery, delay} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {FLASH_NOTIFICATION, setNotification, removeNotification} from './actions';


function* handleFlash({payload}) {
  const {id, message, type, time} = payload;
  yield put(setNotification(id, {message, type}));
  yield delay(time);
  yield put(removeNotification(id));
}


export default function* watch() {
  yield* takeEvery(FLASH_NOTIFICATION, handleFlash);
}
