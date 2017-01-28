import {createNamespace, fsa} from '../../helpers/action';


const ns = createNamespace('images');


export const OPEN = ns('OPEN');
export const open = (id) => fsa(OPEN, id);

export const FETCH_DETAIL = ns('FETCH_DETAIL');
export const fetchDetail = (id) => fsa(FETCH_DETAIL, id);

export const FETCH_BY_VISIBILITY_FILTER = ns('FETCH_BY_VISIBILITY_FILTER');
export const fetchByVisibilityFilter = (filter) => fsa(FETCH_BY_VISIBILITY_FILTER, filter);

export const LOAD_MORE = ns('LOAD_MORE');
export const loadMore = _ => fsa(LOAD_MORE);

export const RECEIVE_RESPONSE = ns('RECEIVE_RESPONSE');
export const receiveResponse = (response) => fsa(RECEIVE_RESPONSE, response);

export const RECEIVE_MORE = ns('RECEIVE_MORE');
export const receiveMore = (response) => fsa(RECEIVE_MORE, response);

export const RECEIVE_ITEM = ns('RECEIVE_ITEM');
export const receiveItem = item => fsa(RECEIVE_ITEM, item);

export const CLEAR = ns('CLEAR');
export const clear = () => fsa(CLEAR);

export const SET_VISIBILITY_FILTER = ns('SET_VISIBILITY_FILTER');
export const setVisibilityFilter = (filter) => fsa(SET_VISIBILITY_FILTER, filter);
