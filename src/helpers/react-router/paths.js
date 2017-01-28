import {createRoutes} from 'react-router';
import getPath from 'ramda/src/path';
import createDebugger from '../../services/debug';


const debug = createDebugger('Paths');


class Path {
  constructor(route) {
    this.route = route;
  }

  toString() {
    return this.route.absPath;
  }

  absolute() {
    return this.route.absPath;
  }

  relative() {
    return this.route.relPath;
  }

  create(params = {}) {
    const path = this.absolute();

    if (!params) return path;

    return Object.keys(params).reduce((acc, key) => {
      const identifier = `:${key}`;

      if (path.indexOf(identifier) > 0) {
        return acc.replace(identifier, params[key]);
      }

      return acc;
    }, path);
  }
}


const createPathMap = (arr, prefix = '', recurse = false) =>
  arr.reduce((acc, {name, path, childRoutes}) => {
    const absPath = `${prefix}${path}`;
    const instance = new Path({name, relPath: path, absPath});

    if (!recurse) {
      acc['root'] = instance;
    } else {
      if (!name) {
        debug.warn(`No route name specified for path ${absPath}.`);
      }

      if (name in acc) {
        debug.warn(`Duplicate route name in ${absPath}. ${name} has already been declared for ${acc[name].absolute()}`);
      }

      acc[name] = instance;
    }

    if (childRoutes) {
      const childMap = createPathMap(childRoutes, !prefix ? path : `${absPath}/`, true);
      const childPrefix = recurse ? `${name}__` : '';

      Object.keys(childMap).forEach(k => {
        acc[`${childPrefix}${k}`] = childMap[k];
      });
    }

    return acc;
  }, {});


const parseRoutes = routes => createPathMap(createRoutes(routes));


export default class Paths {
  constructor(routes) {
    this.paths = parseRoutes(routes);
  }

  _get(alias) {
    const path = this.paths[alias];

    if (!path) {
      throw new Error(
        `Could not find ${alias} from routes ${JSON.stringify(this.paths)}.`
      );
    }

    return path;
  }

  get(alias) {
    return this._get(alias).absolute();
  }

  getRelative(alias) {
    return this._get(alias).relative();
  }

  create(alias, params) {
    return this._get(alias).create(params);
  }
}
