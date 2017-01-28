import {createNamespace, fsa} from '../../helpers/action';


const ns = createNamespace('navigation');


export const NAVIGATE = ns('NAVIGATE');
export const navigate = (path, query = {}) => fsa(NAVIGATE, {path, query});

export const GO_TO = ns('GO_TO');
export const goTo = (alias, params) => fsa(GO_TO, {alias, params});

export const REPLACE = ns('REPLACE');
export const replace = path => fsa(REPLACE, path);

export const REDIRECT_TO = ns('REDIRECT_TO');
export const redirectTo = (alias, params) => fsa(REDIRECT_TO, {alias, params});

export const OPEN_URL = ns('OPEN_URL');
export const openUrl = url => fsa(OPEN_URL, url);

export const OPEN_TAB = ns('OPEN_TAB');
export const openTab = url => fsa(OPEN_TAB, url);

export const GO_BACK = ns('GO_BACK');
export const goBack = () => fsa(GO_BACK);

export const RELOAD = ns('RELOAD');
export const reload = () => fsa(RELOAD);
