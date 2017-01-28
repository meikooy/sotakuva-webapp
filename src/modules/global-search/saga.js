import {takeLatest, delay} from 'redux-saga';
import {call, fork, put, select} from 'redux-saga/effects';
import {reset} from 'redux-form';
import {
  INPUT_CHANGE,
  SEARCH,
  CLEAR,
  search,
  startFetching,
  stopFetching,
  receiveSearchResults,
  searchError,
  clear,
  setSearchedFlag,
  LOAD_MORE,
  receiveMore
} from './actions';
import {goTo, navigate, goBack} from '../navigation/actions';
import {getSearchedFlag, getSearchText, getMeta} from './selectors';
import api from './api';


/*
perform search
 */
function* handleSearch({payload}) {
  try {
    yield put(startFetching());
    const results = yield api.search(payload);
    yield put(receiveSearchResults(results));
    yield put(stopFetching());
  } catch (error) {
    console.log(error);
    yield put(searchError(error));
    yield put(stopFetching());
  }
}

function* watchSearch() {
  yield* takeLatest(SEARCH, handleSearch);
}


/*
  watch input changes
 */
function* watchInput() {
  yield* takeLatest(INPUT_CHANGE, function* ({payload}) {
    yield call(delay, 30);

    try {
      if (payload === '') {
        yield put(goBack());
        yield put(clear());
        return;
      }

      yield put(search(payload));

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


/*
  load more
 */
function* handleLoadMore() {
  try {
    const meta = yield select(getMeta);
    const {page} = meta;
    const searchText = yield select(getSearchText);
    const response = yield api.search(searchText, {page: page + 1});

    yield put(receiveMore(response));
  } catch (er) {
    console.warn(er);
  }
}

function* watchLoadMore() {
  yield* takeLatest(LOAD_MORE, handleLoadMore);
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
    fork(watchInput),
    fork(watchSearch)
  ];
}
