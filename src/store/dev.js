/* global Bugsnag */
import {compose, applyMiddleware, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {SAGA_ACTION} from 'redux-saga/utils';

import reducer from '../reducers';
import history from '../services/history';


// use redux dev tools in development
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

// saga monitor
const sagaMonitor = {
  effectTriggered(options) {},
  effectResolved(effectId, result) {},
  effectCancelled(effectId) {},
  effectRejected(effectId, error) {},
  actionDispatched(action) {}
};

// development middleware
const sagaMiddleware = createSagaMiddleware({sagaMonitor});
const middleware = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history)
);


// compose all enhancers
const enhancer = compose(middleware, devTools);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers/index.js', () => {
      const nextReducer = require('../reducers/index.js').default;
      store.replaceReducer(nextReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;

  return store;
}
