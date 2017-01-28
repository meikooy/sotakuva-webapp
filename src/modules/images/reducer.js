import pipe from 'ramda/src/pipe';
import omit from 'ramda/src/omit';
import append from 'ramda/src/append';
import {createTree, normalize} from '../../helpers/data';
import {over, set} from '../../helpers/lens';
import initialState from './initial-state';
import {
  OPEN,
  CLEAR,
  RECEIVE_RESPONSE,
  RECEIVE_ITEM,
  SET_VISIBILITY_FILTER,
  LOAD_MORE,
  RECEIVE_MORE,
  SET_LAST_SCROLLTOP
} from './actions';


export default function images(state = initialState, {payload, type}) {
  switch (type) {

    case OPEN: return set('active', {loaded: false, id: payload}, state);

    case RECEIVE_ITEM: return set(`byId.${payload.id}`, payload, state);

    case RECEIVE_RESPONSE: return pipe(
      set('byId', normalize(payload.hits)),
      set('meta', omit(['hits'], payload)),
      set('loaded', true)
    )(state);

    case CLEAR: return pipe(
      set('byId', {}),
      set('meta', {}),
      set('loaded', false)
    )(state);

    case SET_VISIBILITY_FILTER: return set('visibilityFilter', payload, state);

    case LOAD_MORE: return set('loadingMore', true, state);

    case RECEIVE_MORE: return pipe(
      over('byId', byId => ({...byId, ...normalize(payload.hits)})),
      set('meta.page', payload.page),
      set('loadingMore', false)
    )(state);
  }

  return state;
}
