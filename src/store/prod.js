/* global Bugsnag */
import {compose, applyMiddleware, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {SAGA_ACTION} from 'redux-saga/utils';

import reducer from '../reducers';
import history from '../services/history';

// saga monitor
const sagaMonitor = {
  effectTriggered(options) {},
  effectResolved(effectId, result) {},
  effectCancelled(effectId) {},
  effectRejected(effectId, error) {},
  actionDispatched(action) {}
};

// production middleware
const sagaMiddleware = createSagaMiddleware({sagaMonitor});
const middleware = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history)
);


// compose all enhancers
const enhancer = middleware;


export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  store.runSaga = sagaMiddleware.run;

  return store;
}
