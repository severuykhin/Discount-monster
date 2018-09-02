import { Record, List } from 'immutable';

export const MODULE_NAME = 'stores';
export const SET_STORES  = `${MODULE_NAME}/SET_STORES`;
export const ADD_STORE   = `${MODULE_NAME}/ADD_STORE`;
export const DELETE_STORE   = `${MODULE_NAME}/DELETE_STORE`;

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

		case DELETE_STORE:
			let oldI = state.get('items').toArray();
			let newI = oldI.filter( i => Number(i.id) !== payload);
			return state.set('items', new List(newI));
		
		default:
			return state;
	}
}


/**
 * Dispatch set stores action
 * @param {array} stores 
 */
export const setStores = stores => ({
	type : SET_STORES,
	payload : stores
});

/**
 * Dispatch add action
 * @param {object} store 
 */
export const addStore = store => ({
	type : ADD_STORE,
	payload : store
});

/**
 * Dispatch delete store action
 * @param {number} id 
 */
export const deleteStore = id => ({
	type : DELETE_STORE,
	payload : id
});