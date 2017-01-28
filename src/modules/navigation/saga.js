import {takeLatest} from 'redux-saga';
import {fork, take} from 'redux-saga/effects';
import {NAVIGATE, OPEN_URL, OPEN_TAB, GO_TO, REDIRECT_TO, REPLACE, GO_BACK, RELOAD} from './actions';
import history from '../../services/history';
import createDebugger from '../../services/debug';
import paths from '../../paths';


const debug = createDebugger('NavigationSaga');


export default function* watch() {
  while (true) {
    const {type, payload} = yield take('*');

    try {
      switch (type) {
        case NAVIGATE:
          history.push(payload.path, payload.query);
          break;

        case OPEN_URL:
          window.location.replace(payload);
          break;

        case OPEN_TAB:
          const a = document.createElement('a');
          a.href = payload;
          a.target = '_blank';
          a.click();
          break;

        case GO_TO:
          history.push(paths.create(payload.alias, payload.params));
          break;

        case REDIRECT_TO:
          history.replace(paths.create(payload.alias, payload.params));
          break;

        case REPLACE:
          history.replace(payload);
          break;

        case GO_BACK:
          history.goBack();
          break;

        case RELOAD:
          window.location.reload();
          break;
      }
    } catch (er) {
      debug.warn(er);
    }
  }
}
