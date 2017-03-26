import {takeLatest, delay} from 'redux-saga';
import {call, fork, put, select} from 'redux-saga/effects';
import {reset, change} from 'redux-form';
import {
  INPUT_CHANGE,
  SEARCH,
  CLEAR,
  search,
  searchError,
  clear,
  setSearchedFlag
} from './actions';
import {receiveResponse} from '../images/actions';
import {goTo, navigate, goBack, replace} from '../navigation/actions';
import {getSearchedFlag, getSearchText, getMeta} from './selectors';
import api from '../images/api';
import {createVisibilityFilter} from '../images/helpers';


/*
perform search
 */
function* handleSearch({payload}) {
  try {
    yield call(delay, 50);
    const response = yield api.fetchByVisibilityFilter(createVisibilityFilter('search', {search: payload}));
    yield put(receiveResponse(response));
  } catch (error) {
    console.log(error);
    yield put(searchError(error));
  }
}

function* watchSearch() {
  yield* takeLatest(SEARCH, handleSearch);
}


/*
  watch input changes
 */
function* watchInput() {
  yield* takeLatest(INPUT_CHANGE, handleSearch);
}

function* watchInputForRedirection() {
  yield* takeLatest(INPUT_CHANGE, function* ({payload}) {
    yield call(delay, 30);

    try {
      if (payload === '') {
        yield put(goBack());
        yield put(clear());
        yield put(change('globalSearch', 'search', ''));
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
    fork(watchInputForRedirection),
    fork(watchSearch)
  ];
}
