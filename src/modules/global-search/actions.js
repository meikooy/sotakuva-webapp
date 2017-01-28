import {createNamespace, fsa} from '../../helpers/action';


const ns = createNamespace('globalSearch');


export const INPUT_CHANGE = ns('INPUT_CHANGE');
export const inputChange = (input) => fsa(INPUT_CHANGE, input);

export const SEARCH = ns('SEARCH');
export const search = (input) => fsa(SEARCH, input);

export const START_FETCHING = ns('START_FETCHING');
export const startFetching = () => fsa(START_FETCHING);

export const STOP_FETCHING = ns('STOP_FETCHING');
export const stopFetching = () => fsa(STOP_FETCHING);

export const CLEAR = ns('CLEAR');
export const clear = () => fsa(CLEAR, null);

export const SEARCH_ERROR = ns('SEARCH_ERROR');
export const searchError = (error) => fsa(SEARCH_ERROR, error);

export const RECEIVE_SEARCH_RESULTS = ns('RECEIVE_SEARCH_RESULTS');
export const receiveSearchResults = (res) => fsa(RECEIVE_SEARCH_RESULTS, res);

export const SET_SEARCHED = ns('SET_SEARCHED');
export const setSearchedFlag = () => fsa(SET_SEARCHED);
