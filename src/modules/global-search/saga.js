import {takeLatest, delay} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {reset} from 'redux-form';
import {
  INPUT_CHANGE,
  SEARCH,
  CLEAR,
  startFetching,
  stopFetching,
  receiveSearchResults,
  searchError
} from './actions';
import api from './api';


/*
perform search
 */
function* handleSearch({payload}) {
  try {
    yield put(startFetching());
    const data = yield api.search(payload);
    yield put(receiveSearchResults(data));
    yield put(stopFetching());
  } catch (error) {
    yield put(searchError(error));
    yield put(stopFetching());
  }
}

function* watchSearch() {
  yield* takeLatest(SEARCH, handleSearch);
}


/*
clear
 */
function* handleClear() {
  try {
    yield put(reset('globalSearch'));
  } catch (er) {
    console.warn(er);
  }
}

function* watchClear() {
  yield* takeLatest(CLEAR, handleClear);
}


export default function* watch() {
  yield* [
    fork(watchClear),
    fork(watchSearch)
  ];
}
