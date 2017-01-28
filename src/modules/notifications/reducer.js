import {findIndex, update} from 'ramda';
import initialState from './initial-state';
import {SET_NOTIFICATION, REMOVE_NOTIFICATION} from './actions';


export default function notifications(state = initialState, {type, payload}) {
  switch (type) {
    // add or update
    case SET_NOTIFICATION:
      const index = findIndex(n => n.id === payload.id, state);
      if (index >= 0) return update(index, payload, state);
      return [...state, payload];

    // remove
    case REMOVE_NOTIFICATION:
      return state.filter(n => n.id !== payload);
  }

  return state;
}
