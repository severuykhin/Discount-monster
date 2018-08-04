import { List, Record } from 'immutable';

export const MODULE_NAME = 'store';
export const SET_ACTIVE_STORE = `${MODULE_NAME}/SET_ACTIVE_STORE`;
export const SET_STORE_ITEMS  = `${MODULE_NAME}/SET_STORE_ITEMS`;
export const CHANGE_EDIT_FORM_STATE = `${MODULE_NAME}/CHANGE_EDIT_FORM_STATE`;

const InitialState = new Record({
	instance : null,
	items : new List([]),
	editFormOpened : false
});

export default function storeReducer(state = new InitialState(), action) {
	const {type, payload} = action;

	switch(type) {
		case SET_ACTIVE_STORE:
			return state.set('instance', payload);
		case SET_STORE_ITEMS:
			return state.set('items', new List(payload));
		case CHANGE_EDIT_FORM_STATE:
			return state.set('editFormOpened', payload);
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

/**
 * Creates Set items action
 * @param {array} items
 * @returns {object} 
 */
export const setStoreItems = items => ({
	type : SET_STORE_ITEMS,
	payload : items
});

/**
 * Creates Change edit form state action
 * @param {bolean} isOpened 
 * @returns {object}
 */
export const changeEditFormState = isOpened => ({
	type : CHANGE_EDIT_FORM_STATE,
	payload : isOpened
});