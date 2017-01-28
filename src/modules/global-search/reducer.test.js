import reducer from './reducer';
import initialState from './initial-state';
import {clear, setSearchedFlag} from './actions';

test('clear resets everything', () => {
  const actions = [
    setSearchedFlag(true),
    receiveSearchResults([{id: 1}]),
    clear()
  ];

  const state = actions.reduce(reducer, initialState);

  expect(state).toEqual(initialState);
});
