import React from 'react';
import {Route, IndexRoute} from 'react-router';

import RootPage from '../pages/root';
import HomePage from '../pages/home-page';
import ImagesPage from '../pages/images-page';
import ImageDetailPage from '../pages/image-detail-page';


export default (
  <Route path='/' component={RootPage}>
    <IndexRoute component={HomePage} />

    <Route name='images' path='kuvat' component={ImagesPage}>
      <Route name='detail' path=':id' component={ImageDetailPage} />
    </Route>
  </Route>
);
