import {createVisibilityFilter} from './helpers';
import {eras} from './dict';

export const initialVisibilityFilter = {name: 'era', params: {era: 1, title: eras[1]}};

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

  visibilityFilter: initialVisibilityFilter,
};
