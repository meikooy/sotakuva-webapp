import pipe from 'ramda/src/pipe';
import {set, over} from '../../helpers/lens';
import omit from 'ramda/src/omit';
import {
  CLEAR,
  RECEIVE_SEARCH_RESULTS,
  START_FETCHING,
  STOP_FETCHING,
  SET_SEARCHED_FLAG,
  LOAD_MORE,
  RECEIVE_MORE
} from './actions';
import {normalize} from '../../helpers/data';
import initialState from './initial-state';


export default function globalSearch(state = initialState, {payload, type}) {
  switch (type) {
    // clear input and results
    case CLEAR: return initialState;

    // fetching flag
    case START_FETCHING: return set('fetching', true, state);
    case STOP_FETCHING: return set('fetching', false, state);

    // got search results
    case RECEIVE_SEARCH_RESULTS: return pipe(
      set('searchResults', normalize(payload.hits)),
      set('meta', omit(['hits'], payload))
    )(state);

    case SET_SEARCHED_FLAG: return set('searched', true, state);

    case LOAD_MORE: return set('loadingMore', true, state);

    case RECEIVE_MORE: return pipe(
      over('searchResults', byId => ({...byId, ...normalize(payload.hits)})),
      set('meta.page', payload.page),
      set('loadingMore', false)
    )(state);
  }

  return state;
}
