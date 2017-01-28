import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import notifications from '../modules/notifications/reducer';
import images from '../modules/images/reducer';
import globalSearch from '../modules/global-search/reducer';


export default combineReducers({
  notifications,
  globalSearch,
  images,
  form
});
