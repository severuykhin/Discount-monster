import { Record, List } from 'immutable';

export const MODULE_NAME = 'items';
export const SET_ACTIVE  = `${MODULE_NAME}/SET_ACTIVE`;
export const SET_TOTAL   = `${MODULE_NAME}/SET_TOTAL`;
export const SET_BUSY    = `${MODULE_NAME}/SET_BUSY`;

const InitialState = new Record({
	active : new List([]),
	total  : 0,
	busy   : false
});

export default function itemsReducer(state = new InitialState(), action) {
	const { type, payload } = action;

	switch(type) {
		case SET_ACTIVE:
			return state.set('active', new List(payload));
		case SET_TOTAL:
			return state.set('total', payload);
		case SET_BUSY:
			return state.set('busy', payload);
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


/**
 * Dispatch set total items action
 * @param {number} num - total item count 
 */
export const setTotal = num => ({
	type    : SET_TOTAL,
	payload : num
});

/**
 * Dispatch set busy action
 * @param {boolean} isBusy 
 */
export const setBusy = isBusy => ({
	type : SET_BUSY,
	payload : isBusy
});