import {createVisibilityFilter} from './helpers';

/*eslint max-len: 0*/
export default {
  loaded: false,
  loadingMore: false,
  byId: {},
  meta: {},

  active: {
    loaded: false,
    id: null
  },

  visibilityFilter: null,
};
