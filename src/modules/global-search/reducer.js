import assoc from 'ramda/src/assoc';
import {
  CLEAR,
  RECEIVE_SEARCH_RESULTS,
  START_FETCHING,
  STOP_FETCHING,
  SET_SEARCHED
} from './actions';
import initialState from './initial-state';


export default function globalSearch(state = initialState, {payload, type}) {
  switch (type) {
    // clear input and results
    case CLEAR: return initialState;

    // fetching flag
    case START_FETCHING: return assoc('fetching', true, state);
    case STOP_FETCHING: return assoc('fetching', false, state);

    // got search results
    case RECEIVE_SEARCH_RESULTS: return assoc('searchResults', payload, state);

    // set searched flag
    case SET_SEARCHED: return assoc('searched', true, state);
  }

  return state;
}
