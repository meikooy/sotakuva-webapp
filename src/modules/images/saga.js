import {takeLatest, takeEvery, delay} from 'redux-saga';
import {take, fork, select, call, put, race} from 'redux-saga/effects';
import {
  OPEN,
  open,
  LOAD_MORE,
  FETCH_DETAIL,
  SET_VISIBILITY_FILTER,
  FETCH_BY_VISIBILITY_FILTER,
  fetchByVisibilityFilter,
  receiveResponse,
  receiveMore,
  receiveItem,
  clear,
} from './actions';
import {goTo, openUrl, reload} from '../navigation/actions';
import {setNotification, flashNotification, removeNotification} from '../notifications/actions';
import {getMeta, getActiveFilter} from './selectors';
import api from './api';
import {createVisibilityFilter} from './helpers';


/*
  fetch detail
 */
function* handleFetchDetail({payload}) {
  try {
    const data = yield api.fetchById(payload);
    const image = data.hits[0];
    if (!image) throw new Error('No image found!');
    yield put(receiveItem(image));
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
    const response = yield api.fetchByVisibilityFilter(payload);
    yield put(receiveResponse(response));
  } catch (er) {
    console.warn(er);
  }
}

function* watchVisibilityFilterFetches() {
  yield* takeLatest(FETCH_BY_VISIBILITY_FILTER, handleFetchByVisibilityFilter);
}

function* watchVisibilityFilters() {
  yield* takeLatest(SET_VISIBILITY_FILTER, function* ({payload}) {
    yield put(clear());
    yield put(fetchByVisibilityFilter(payload));
    yield put(goTo('images'));
  });
}


/*
  load more
 */
function* handleLoadMore() {
  try {
    const meta = yield select(getMeta);
    const {page} = meta;

    const activeFilter = yield select(getActiveFilter);
    const {name, params} = activeFilter;

    const filter = createVisibilityFilter(name, {...params, page: page + 1});

    console.log(filter);

    const response = yield api.fetchByVisibilityFilter(filter);

    yield put(receiveMore(response));
  } catch (er) {
    console.warn(er);
  }
}

function* watchLoadMore() {
  yield* takeLatest(LOAD_MORE, handleLoadMore);
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
  yield fork(watchLoadMore);
}
