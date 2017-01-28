import {takeLatest, takeEvery, delay} from 'redux-saga';
import {take, fork, call, put, race} from 'redux-saga/effects';
import {
  OPEN,
  open,
  FETCH_DETAIL,
  SET_VISIBILITY_FILTER,
  FETCH_BY_VISIBILITY_FILTER,
  fetchByVisibilityFilter,
  receiveRows,
  receiveItem,
  clearRows,
} from './actions';
import {goTo, openUrl, reload} from '../navigation/actions';
import {setNotification, flashNotification, removeNotification} from '../notifications/actions';
import api from './api';


/*
  fetch detail
 */
function* handleFetchDetail({payload}) {
  try {
    const data = yield api.fetchById(payload);
    yield put(receiveItem(data));
  } catch (er) {
    console.warn(er);
  }
}

function* watchDetailFetches() {
  yield* takeLatest(FETCH_DETAIL, handleFetchDetail);
}


/*
  fetch by visibilityFilter
 */
function* handleFetchByVisibilityFilter({payload}) {
  try {
    const data = yield api.fetchByVisibilityFilter(payload);
    yield put(receiveRows(data));
  } catch (er) {
    console.warn(er);
  }
}

function* watchVisibilityFilterFetches() {
  yield* takeLatest(FETCH_BY_VISIBILITY_FILTER, handleFetchByVisibilityFilter);
}

function* watchVisibilityFilters() {
  yield* takeLatest(SET_VISIBILITY_FILTER, function* ({payload}) {
    yield put(clearRows());
    yield put(fetchByVisibilityFilter(payload));
    yield put(goTo('images'));
  });
}


/*
  open
 */
function* handleOpen({payload}) {
  try {
    yield put(goTo('images__detail', {id: payload}));
  } catch (er) {
    console.warn(er);
  }
}

function* watchOpens() {
  yield* takeLatest(OPEN, handleOpen);
}


export default function* watch() {
  yield fork(watchOpens);
  yield fork(watchDetailFetches);
  yield fork(watchVisibilityFilterFetches);
  yield fork(watchVisibilityFilters);
}
