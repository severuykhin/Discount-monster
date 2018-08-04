import { List, Record } from 'immutable';

export const MODULE_NAME = 'store';
export const SET_ACTIVE_STORE = `${MODULE_NAME}/SET_ACTIVE_STORE`;
export const SET_STORE_ITEMS  = `${MODULE_NAME}/SET_STORE_ITEMS`;

const InitialState = new Record({
	instance : null,
	items : new List([])
});

export default function storeReducer(state = new InitialState(), action) {
	const {type, payload} = action;

	switch(type) {
		case SET_ACTIVE_STORE:
			return state.set('instance', payload);
		default:
			return state;
	}
}

/**
 * Creates Set active store action
 * @param {object} instance - New store instance
 * @return {object}
 */
export const setActiveStore = instance => ({
	type : SET_ACTIVE_STORE,
	payload : instance
});