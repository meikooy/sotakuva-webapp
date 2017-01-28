import {createSelector} from 'reselect';
import {get} from '../../helpers/lens';


export const getActiveFilter = get('images.visibilityFilter');
export const getImages = get('images.byId');
export const areImagesLoaded = get('images.loaded');
export const getMeta = get('images.meta');
export const getActive = get('images.active');
export const isActiveLoaded = createSelector(getActive, ({loaded}) => !!loaded);
export const getActiveData = createSelector(
  getActive,
  getImages,
  ({id}, byId) => byId[id] || null
);
export const areWeLoadingMore = get('images.loadingMore');
