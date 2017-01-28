import {createNamespace, fsa} from '../../helpers/action';


const ns = createNamespace('notifications');


export const SET_NOTIFICATION = ns('SET');
export const setNotification = (id, {message, type}) => fsa(SET_NOTIFICATION, {id, message, type});

export const FLASH_NOTIFICATION = ns('FLASH');
export const flashNotification = (id, {message, type, time}) => fsa(FLASH_NOTIFICATION, {id, message, type, time});

export const REMOVE_NOTIFICATION = ns('REMOVE');
export const removeNotification = id => fsa(REMOVE_NOTIFICATION, id);
