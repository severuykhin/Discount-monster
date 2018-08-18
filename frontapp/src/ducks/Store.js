import { List, Record } from 'immutable';

export const MODULE_NAME = 'store';
export const SET_ALL     = `${MODULE_NAME}/SET_ALL`;

const InitialState = new Record({
	stores : {}
});

export default function storeReducer(state = new InitialState(), action) {
	const {type, payload} = action;

	switch(type) {
		case SET_ALL:
			return state;
		default:
			return state;
	}
};


/**
 * Creates SET ALL AVAILABLE STORES action
 * @param {array} stores
 * @returns {object} 
 */
export const setStores = stores => ({
	type    : SET_ALL,
	payload : stores
});