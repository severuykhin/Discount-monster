import { List, Record } from 'immutable';

export const MODULE_NAME  = 'favorites';
export const SET_FAVS     = `${MODULE_NAME}/SET_FAVS`;
export const SET_FULL     = `${MODULE_NAME}/SET_FULL`;
export const ADD_FAV      = `${MODULE_NAME}/ADD_FAV`;
export const DELETE_FAV   = `${MODULE_NAME}/DELETE_FAV`;
export const SET_STATE    = `${MODULE_NAME}/SET_STATE`;
export const SET_BUSY     = `${MODULE_NAME}/SET_BUSY`;


const InitialState = new Record({
	items  : new List([]),
	opened : false,
	fullItems : new List([]),
	busy : false 
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
		case SET_FULL:
			return state.set('fullItems', new List(payload))
		case DELETE_FAV:
			const oldItems = state.get('items').toArray();
			const newItems = oldItems.filter( item => item !== payload);
			const oldFull  = state.get('fullItems');
			const newFull  = oldFull.filter( item => Number(item.id) !== payload);
			const newState = state.set('items', new List(newItems));
			return newState.set('fullItems', new List(newFull));
		case SET_STATE:
			return state.set('opened', payload);
		case SET_BUSY:
			return state.set('busy', payload);
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


/**
 * Create set state action 
 * @param {boolean} isOpened 
 */
export const setState = isOpened => ({
	type : SET_STATE,
	payload : isOpened
});

/**
 * Creates set full items action
 * @param {array} items 
 */
export const setFull = items => ({
	type : SET_FULL,
	payload : items
});


/**
 * Creates set busy action
 * @param {boolean} state 
 */
export const setBusy = state => ({
	type : SET_BUSY,
	payload : state
});