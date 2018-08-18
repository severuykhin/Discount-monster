import { Record, List } from 'immutable';

export const MODULE_NAME = 'items';
export const SET_ACTIVE  = `${MODULE_NAME}/SET_ACTIVE`;

const InitialState = new Record({
	active : new List([])
});

export default function itemsReducer(state = new InitialState(), action) {
	const { type, payload } = action;

	switch(type) {
		case SET_ACTIVE:
			return state.set('active', new List(payload));
		default: 
			return state;
	}
}

/**
 * Dispatch Set active items action
 * @param {array} items
 * @returns {object} 
 */
export const setActive = items => ({
	type    : SET_ACTIVE,
	payload : items
});