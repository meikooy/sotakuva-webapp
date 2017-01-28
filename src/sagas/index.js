import {fork, take} from 'redux-saga/effects';

import navigation from '../modules/navigation/saga';
import notifications from '../modules/notifications/saga';
import globalSearch from '../modules/global-search/saga';
import images from '../modules/images/saga';
import exceptions from '../modules/exceptions/saga';


export default function* root() {
  yield [
    fork(exceptions),
    fork(navigation),
    fork(notifications),
    fork(images),
    fork(globalSearch)
  ];
}
