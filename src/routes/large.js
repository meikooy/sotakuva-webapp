import React from 'react';
import {Route, IndexRedirect, IndexRoute, Redirect, createRoutes} from 'react-router';

import RootPage from '../pages/root';
import HomePage from '../pages/home-page';
import SearchPage from '../pages/search-page';
import ImagesPage from '../pages/images-page';


export default (
  <Route path='/' component={RootPage}>
    <IndexRoute component={HomePage} />

    <Route name='images' path='images'>
      <IndexRoute component={ImagesPage} />
    </Route>

    <Route name='search' path='haku' component={SearchPage} />
  </Route>
);
