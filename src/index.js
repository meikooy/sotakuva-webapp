/* global ga */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from './routes';
import configureStore from './store/configure-store';
import rootSaga from './sagas';
import history from './services/history';

// redirect hashbangs
const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
if (path) history.replace(path);


// configure Google Analytics
if (typeof(ga) !== 'undefined') {
  ga('create', process.env.GOOGLE_ANALYTICS_KEY, 'auto');
  history.listen(location => {
    ga('send', 'pageview', location.pathname);
  });
}


// styles
require('./styles/index.scss');
if (module.hot) {
  module.hot.accept('./styles/index.scss');
}


// store
const serverState = JSON.parse(window['INITIAL_STATE'] || '{}');
const initialState = {...serverState};
const store = configureStore(initialState);


// preparation
function prepare() {
  return Promise.resolve(true);
}


// render
function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
  );
}


// run sagas, prepare and render
function init() {
  store.runSaga(rootSaga);
  prepare().then(render);
}


init();
