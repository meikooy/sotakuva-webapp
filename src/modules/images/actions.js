import {createNamespace, fsa} from '../../helpers/action';


const ns = createNamespace('images');


export const OPEN = ns('OPEN');
export const open = (id) => fsa(OPEN, id);

export const FETCH_DETAIL = ns('FETCH_DETAIL');
export const fetchDetail = (id) => fsa(FETCH_DETAIL, id);

export const FETCH_BY_VISIBILITY_FILTER = ns('FETCH_BY_VISIBILITY_FILTER');
export const fetchByVisibilityFilter = (filter) => fsa(FETCH_BY_VISIBILITY_FILTER, filter);

export const RECEIVE_ROWS = ns('RECEIVE_ROWS');
export const receiveRows = (rows) => fsa(RECEIVE_ROWS, rows);

export const RECEIVE_ITEM = ns('RECEIVE_ITEM');
export const receiveItem = item => fsa(RECEIVE_ITEM, item);

export const CLEAR_ROWS = ns('CLEAR_ROWS');
export const clearRows = () => fsa(CLEAR_ROWS);

export const SET_VISIBILITY_FILTER = ns('SET_VISIBILITY_FILTER');
export const setVisibilityFilter = (filter) => fsa(SET_VISIBILITY_FILTER, filter);
