import {createNamespace, fsa} from '../../helpers/action';


const ns = createNamespace('exceptions');


export const EXCEPTION = ns('EXCEPTION');
export const exception = (message, data) => fsa(EXCEPTION, {message, data});
