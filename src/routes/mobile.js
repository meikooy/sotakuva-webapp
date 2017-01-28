import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import RootPage from '../pages/mobile/root';
import HomePage from '../pages/mobile/home-page';
import ImagesPage from '../pages/mobile/images-page';


export default (
  <Route path='/' component={RootPage}>
    <IndexRoute component={HomePage} />

    <Route name='images' path='kuvat' component={ImagesPage}>
    </Route>
  </Route>
);
