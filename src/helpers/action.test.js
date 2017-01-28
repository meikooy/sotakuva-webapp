import {isFSA, isError} from 'flux-standard-action';
import {createNamespace, fsa} from './action';


const ACTION = 'SOME_ACTION';


test('createNamespace creates an expected namespace', () => {
  const namespace = 'meiko';

  const actual = createNamespace(namespace)(ACTION);
  const expected = 'meiko/SOME_ACTION';

  expect(actual).toBe(expected);
});


test('Creates FSA compliant actions', () => {
  expect(isFSA(fsa(ACTION, 'foo'))).toBe(true);
  expect(isFSA(fsa(ACTION, 'foo', 'bar'))).toBe(true);
  expect(isFSA(fsa(ACTION, new Error('asd')))).toBe(true);
  expect(isError(fsa(ACTION, new Error('asd')))).toBe(true);
});
