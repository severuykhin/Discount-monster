import { List, Record } from 'immutable';

export const MODULE_NAME  = 'favorites';
export const SET_FAVS     = `${MODULE_NAME}/SET_FAVS`;
export const ADD_FAV      = `${MODULE_NAME}/ADD_FAV`;
export const DELETE_FAV   = `${MODULE_NAME}/DELETE_FAV`;

const InitialState = new Record({
	items : new List([])
});

export default function favoritesReducer (state = new InitialState(), action) {
	const { type, payload } = action;

	switch(type) {
		case SET_FAVS:
			return state.set('items', new List(payload));
		case ADD_FAV:
			const items = state.get('items').toArray();
			items.push(payload);
			return state.set('items', new List(items));
		case DELETE_FAV:
			const oldItems = state.get('items').toArray();
			const newItems = oldItems.filter( item => item !== payload);
			return state.set('items', new List(newItems));
		default:
			return state;
	}
}

/**
 * Creates new set items action
 * @param { array } items 
 */
export const setFavs = items => ({
	type : SET_FAVS,
	payload : items
});


/**
 * Creates new add fav action
 * @param {number} id 
 */
export const addFav = id => ({
	type : ADD_FAV,
	payload : id
});

/**
 * Creates new delete fav action
 * @param {number} id 
 */
export const deleteFav = id => ({
	type : DELETE_FAV,
	payload : id
});