import {normalize} from '../../helpers/data';
import {over} from '../../helpers/lens';
import {createQueryFromVisibilityFilter} from './helpers';


export default {
  fetchByVisibilityFilter(filter) {
    const query = createQueryFromVisibilityFilter(filter);
    return Promise.resolve([]);
  },

  fetchById(id) {
    return Promise.resolve({});
  }
};
