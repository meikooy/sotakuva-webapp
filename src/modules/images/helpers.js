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
  switch (filter.name) {
    case 'era': return {search: null, params: {filters: `era=${filter.params.era}`, page: filter.params.page || 0}};
    case 'search': return {search: filter.search, params: {page: filter.params.page || 0}};
  }

  return {};
};
