import { Record, List } from 'immutable';

export const MODULE_NAME = 'stores';
export const SET_STORES  = `${MODULE_NAME}/SET_STORES`;
export const ADD_STORE   = `${MODULE_NAME}/ADD_STORE`;

const InitialState = new Record({
	items : new List([])
});

export default function storesReducer(state = new InitialState(), action) {
	const {type, payload} = action;

	switch(type) {
		case SET_STORES:
			return state.set('items', new List(payload));
		
		case ADD_STORE:
			let oldItems = state.get('items'),
				newItems = oldItems.push(payload);
			return state.set('items', newItems);
		
		default:
			return state;
	}
}


/**
 * Dispatch set stores action
 * @param {array} stores 
 */
export const setStores = (stores) => ({
	type : SET_STORES,
	payload : stores
});

export const addStore = (store) => ({
	type : ADD_STORE,
	payload : store
});