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

export const LOAD_MORE = ns('LOAD_MORE');
export const loadMore = _ => fsa(LOAD_MORE);

export const RECEIVE_MORE = ns('RECEIVE_MORE');
export const receiveMore = (response) => fsa(RECEIVE_MORE, response);

export const CLEAR = ns('CLEAR');
export const clear = () => fsa(CLEAR, null);

export const SEARCH_ERROR = ns('SEARCH_ERROR');
export const searchError = (error) => fsa(SEARCH_ERROR, error);

export const RECEIVE_SEARCH_RESULTS = ns('RECEIVE_SEARCH_RESULTS');
export const receiveSearchResults = (res) => fsa(RECEIVE_SEARCH_RESULTS, res);

export const SET_SEARCHED_FLAG = ns('SET_SEARCHED_FLAG');
export const setSearchedFlag = bool => fsa(SET_SEARCHED_FLAG, bool);
