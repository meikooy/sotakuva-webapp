import React from 'react';
import {Route, IndexRoute} from 'react-router';

import RootPage from '../pages/root';
import HomePage from '../pages/home-page';
import TermsPage from '../pages/terms';
import ImagesPage from '../pages/images-page';
import ImageDetailPage from '../pages/image-detail-page';
import SearchPage from '../pages/search-page';

export default (
  <Route path='/' component={RootPage}>
    <IndexRoute component={HomePage} />

    <Route name="terms" path="kayttoehdot" component={TermsPage} />

    <Route name='images' path='kuvat'>
      <IndexRoute component={ImagesPage} />
      <Route name='detail' path=':id' component={ImageDetailPage} />
    </Route>

    <Route name='search' path='haku' component={SearchPage} />
  </Route>
);
