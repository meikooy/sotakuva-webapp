import reducer from './reducer';
import initialState from './initial-state';
import {clear, setSearchedFlag, receiveSearchResults} from './actions';


test('receiveSearchResults updates search results', () => {
  const payload = [{id: 1}, {id: 2}];
  const newState = reducer(initialState, receiveSearchResults(payload));

  expect(newState.searchResults.length).toBe(2);
  expect(newState.searchResults[0].id).toBe(1);
  expect(newState.searchResults[1].id).toBe(2);
});


test('clear resets everything', () => {
  const actions = [
    setSearchedFlag(true),
    receiveSearchResults([{id: 1}]),
    clear()
  ];

  const state = actions.reduce(reducer, initialState);

  expect(state).toEqual(initialState);
});
