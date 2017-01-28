import {createNamespace, fsa} from '../../helpers/action';


const ns = createNamespace('globalSearch');


export const INPUT_CHANGE = ns('INPUT_CHANGE');
export const inputChange = (input) => fsa(INPUT_CHANGE, input);

export const SEARCH = ns('SEARCH');
export const search = (input) => fsa(SEARCH, input);

export const CLEAR = ns('CLEAR');
export const clear = () => fsa(CLEAR, null);

export const SEARCH_ERROR = ns('SEARCH_ERROR');
export const searchError = (error) => fsa(SEARCH_ERROR, error);

export const SET_SEARCHED_FLAG = ns('SET_SEARCHED_FLAG');
export const setSearchedFlag = bool => fsa(SET_SEARCHED_FLAG, bool);
