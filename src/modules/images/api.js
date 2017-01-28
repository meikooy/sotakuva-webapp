import algolia from '../../services/algolia';
import {createQueryFromVisibilityFilter} from './helpers';


export default {
  fetchByVisibilityFilter(filter) {
    const {search, params} = createQueryFromVisibilityFilter(filter);
    console.log(search);
    return new Promise((resolve, reject) => {
      algolia.search(search, params, (err, content) => {
        if (err) reject(err);
        resolve(content);
      });
    });
  },

  fetchById(id) {
    return new Promise((resolve, reject) => {
      algolia.search({filters: `objectID:${id}`}, (err, content) => {
        if (err) reject(err);
        resolve(content);
      });
    });
  }
};
