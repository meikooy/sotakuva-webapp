import React from 'react';
import {Route, IndexRedirect, IndexRoute, Redirect, createRoutes} from 'react-router';

import RootPage from '../pages/root';
import SearchPage from '../pages/search-page';


export default (
  <Route path='/' component={RootPage}>
    <IndexRedirect to="images" />

    <Route name='images' path='images'>
    </Route>

    <Route name='search' path='haku' component={SearchPage} />
  </Route>
);
