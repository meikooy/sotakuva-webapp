import pipe from 'ramda/src/pipe';
import omit from 'ramda/src/omit';
import append from 'ramda/src/append';
import {createTree, normalize} from '../../helpers/data';
import {over, set} from '../../helpers/lens';
import initialState from './initial-state';
import {
  OPEN,
  CLEAR_ROWS,
  RECEIVE_ROWS,
  RECEIVE_ITEM,
  SET_VISIBILITY_FILTER,
} from './actions';


export default function images(state = initialState, {payload, type}) {
  switch (type) {

    case OPEN: return set('active', {loaded: false, id: payload}, state);

    case RECEIVE_ITEM: return set(`byId.${payload.id}`, payload, state);

    case RECEIVE_ROWS: return pipe(
      over('byId', old => ({...old, ...normalize(payload)})),
      set('loaded', true)
    )(state);

    case CLEAR_ROWS: return pipe(
      set('byId', {}),
      set('loaded', false)
    )(state);

    case SET_VISIBILITY_FILTER: return set('visibilityFilter', payload, state);
  }

  return state;
}
