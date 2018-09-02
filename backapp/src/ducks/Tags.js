import { List, Record } from 'immutable';

export const MODULE_NAME          = 'tags';
export const ACTION_ADD_TAG       = `${MODULE_NAME}/ACTION_ADD_TAG`;
export const ACTION_DELETE_TAG    = `${MODULE_NAME}/ACTION_DELETE_TAG`;
export const ACTION_SET_TAGS      = `${MODULE_NAME}/ACTION_SET_TAGS`;
export const ACTION_SET_ADD_VALUE = `${MODULE_NAME}/ACTION_SET_ADD_VALUE`;
export const ACTION_SET_ADD_ERROR = `${MODULE_NAME}/ACTION_SET_ADD_ERROR`;
export const ACTION_SET_BUSY      = `${MODULE_NAME}/ACTION_SET_BUSY`;

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

		case ACTION_ADD_TAG:
			const oldItems = state.get('items');
			const newItems = oldItems.push(payload);
			return state.set('items', newItems);
		
		case ACTION_DELETE_TAG:
			let oldI = state.get('items').toArray();
			let newI = oldI.filter( i => Number(i.id) !== payload);
			return state.set('items', new List(newI));

		case ACTION_SET_ADD_VALUE:
			return state.set('addValue', payload);

		case ACTION_SET_ADD_ERROR:
			return state.set('addError', payload);

		case ACTION_SET_BUSY:
			return state.set('busy', payload);

		default:
			return state;
	}
}

// Actions with items

/**
 * Dispatch tags items get action
 * @param {array} items 
 */
export const setItems  = items => ({
	type : ACTION_SET_TAGS,
	payload : items
});

/**
 * Dispatch add new item cation
 * @param {object} item 
 */
export const setItem = item => ({
	type : ACTION_ADD_TAG,
	payload : item	
});

/**
 * Dispatch delete item action
 * @param {number} id 
 */
export const deleteItem = id => ({
	type : ACTION_DELETE_TAG,
	payload : id
});

// Aside actions

/**
 * Dispatch add tag value set action
 * @param {string} value 
 */
export const setAddValue = value => ({
	type : ACTION_SET_ADD_VALUE,
	payload : value
});

/**
 * Dispatch input error state
 * @param {boolean} value
 */
export const setAddError = (value) => ({
	type : ACTION_SET_ADD_ERROR,
	payload : value
});

/**
 * Sets state of bussiness
 * @param {boolean} value 
 */
export const setBusyState = (value) => ({
	type : ACTION_SET_BUSY,
	payload : value
});


