import curryN from 'ramda/src/curryN';
import overLens from 'ramda/src/over';
import lensPath from 'ramda/src/lensPath';
import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';


export const over = curryN(3, (str, f, obj) => overLens(lensPath(str.split('.')), f, obj));

export const get = curryN(2, (str, obj) => path(str.split('.'), obj));

export const set = curryN(3, (str, val, obj) => assocPath(str.split('.'), val, obj));
