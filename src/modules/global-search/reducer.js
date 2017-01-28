import {set} from '../../helpers/lens';
import {CLEAR, SET_SEARCHED_FLAG} from './actions';
import initialState from './initial-state';


export default function globalSearch(state = initialState, {payload, type}) {
  switch (type) {
    case CLEAR: return initialState;
    case SET_SEARCHED_FLAG: return set('searched', true, state);
  }

  return state;
}
