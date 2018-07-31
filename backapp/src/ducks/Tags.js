import { List, Record } from 'immutable';

export const MODULE_NAME       = 'tags';
export const ACTION_ADD_TAG    = `${MODULE_NAME}/ACTION_ADD_TAG`;
export const ACTION_DELETE_TAG = `${MODULE_NAME}/ACTION_DELETE_TAG`;
export const ACTION_SET_TAGS   = `${MODULE_NAME}/ACTION_SET_TAGS`;
export const ACTION_SET_ADD_VALUE = `${MODULE_NAME}/ACTION_SET_ADD_VALUE`;
export const ACTION_SET_ADD_ERROR = `${MODULE_NAME}/ACTION_SET_ADD_ERROR`;

const InitialState = new Record({
	busy     : false,
	items    : new List(),
	addValue : '',
	addError : false
});

export default function reducer (state = new InitialState(), action) {
	const { type, payload } = action;

	switch(type) {
		case ACTION_SET_TAGS:
			const items = new List(payload);
			return state.set('items', items);
		case ACTION_SET_ADD_VALUE:
			return state.set('addValue', payload)
		case ACTION_SET_ADD_ERROR:
			return state.set('addError', payload);
		default:
			return state;
	}
}

/**
 * Dispatch tags items get action
 * @param {array} items 
 */
export const setItems  = items => ({
	type : ACTION_SET_TAGS,
	payload : items
});

/**
 * Dispatch add tag value set action
 * @param {string} value 
 */
export const setAddValue = value => ({
	type : ACTION_SET_ADD_VALUE,
	payload : value
});

/**
 * Dispatch add tag error value
 */
export const setAddError = () => ({
	type : ACTION_SET_ADD_ERROR,
	payload : true
});

