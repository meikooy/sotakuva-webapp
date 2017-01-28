import algolia from '../../services/algolia';
import {normalize} from '../../helpers/data';
import {over} from '../../helpers/lens';
import {createQueryFromVisibilityFilter} from './helpers';


export default {
  fetchByVisibilityFilter(filter) {
    const {search, params} = createQueryFromVisibilityFilter(filter);
    console.log(search, params);

    return new Promise((resolve, reject) => {
      algolia.search(search, params, (err, content) => {
        if (err) reject(err);
        resolve(content);
      });
    });
  },

  fetchById(id) {
    return new Promise((resolve, reject) => {
      algolia.search({filters: `id=${id}`}, (err, content) => {
        if (err) reject(err);
        resolve(content);
      });
    });
  }
};
