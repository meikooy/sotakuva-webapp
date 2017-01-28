import React from 'react';
import {set, over, path} from '../../helpers/lens';


export const createVisibilityFilter = (name, params) => {
  let filter = {name};

  if (params) filter.params = params;

  Object.defineProperty(filter, 'toString', {
    enumberable: false,
    configurable: true,
    value: () => name
  });

  return filter;
};

export const createQueryFromVisibilityFilter = filter => {
  const paramsBase = {hitsPerPage: 24, page: filter.params.page || 0};

  switch (filter.name) {
    case 'era': return {search: null, params: {filters: `era=${filter.params.era}`, ...paramsBase}};
    case 'search': return {search: filter.search, params: paramsBase};
  }

  return {};
};
