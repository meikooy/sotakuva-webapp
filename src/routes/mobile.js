import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import RootPage from '../pages/mobile/root';


export default (
  <Route path='/' component={RootPage}>
    <IndexRedirect to="images" />

    <Route name='images' path='images'>
    </Route>
  </Route>
);
