import {get} from '../../helpers/lens';

export const getSearchedFlag = get('globalSearch.searched');
export const getSearchText = get('form.globalSearch.values.search');
export const getSearchResults = get('globalSearch.searchResults');
export const isFetching = get('globalSearch.fetching');
