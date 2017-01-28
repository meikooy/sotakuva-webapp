import algolia from '../../services/algolia';

export default {
  search(str, params = {}) {
    const paramsBase = {page: params.page || 0, hitsPerPage: 24};

    return new Promise((resolve, reject) => {
      algolia.search(str, {...paramsBase, ...params}, (err, content) => {
        if (err) reject(err);
        resolve(content);
      });
    });
  }
};
