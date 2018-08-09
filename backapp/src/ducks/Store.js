import { List, Record } from 'immutable';

export const MODULE_NAME            = 'store';
export const SET_ACTIVE_STORE       = `${MODULE_NAME}/SET_ACTIVE_STORE`;
export const UPDATE_ACTIVE_STORE    = `${MODULE_NAME}/UPDATE_ACTIVE_STORE`;
export const SET_STORE_ITEMS        = `${MODULE_NAME}/SET_STORE_ITEMS`;
export const CHANGE_EDIT_FORM_STATE = `${MODULE_NAME}/CHANGE_EDIT_FORM_STATE`;
export const CHANGE_BUSY_STATE      = `${MODULE_NAME}/CHANGE_BUSY_STATE`;
export const CHANGE_FILTER_STATE    = `${MODULE_NAME}/CHANGE_FILTER_STATE`;
export const SET_ACTIVE_SORT        = `${MODULE_NAME}/SET_ACTIVE_SORT`;
export const DELETE_ITEM            = `${MODULE_NAME}/DELETE_ITEM`;

const InitialState = new Record({
	instance : null,
	items : new List([]),
	editFormOpened : false,
	busy : false,
	filterFormOpened : false,
	activeSort : ''
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
		case CHANGE_BUSY_STATE:
			return state.set('busy', payload);
		case CHANGE_FILTER_STATE:
			return state.set('filterFormOpened', payload);
		case SET_ACTIVE_SORT:
			return state.set('activeSort', payload);
		case UPDATE_ACTIVE_STORE:
			let store = state.get('instance');
			store.name = payload.name;
			store.url  = payload.url;
			return state.set('instance', store);
		case DELETE_ITEM:
			let items = [...state.get('items').toArray()];
			items.forEach((item, index) => {
				if (item.id === payload) {
					items = items.slice(0, index).concat(items.slice(index + 1));
				}
			});
			return state.set('items', new List(items));

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
	type    : SET_ACTIVE_STORE,
	payload : instance
});

/**
 * Creates Set items action
 * @param {array} items
 * @returns {object} 
 */
export const setStoreItems = items => ({
	type    : SET_STORE_ITEMS,
	payload : items
});

/**
 * Creates Change edit form state action
 * @param {bolean} isOpened 
 * @returns {object}
 */
export const changeEditFormState = isOpened => ({
	type    : CHANGE_EDIT_FORM_STATE,
	payload : isOpened
});

/**
 * Creates updating form state action
 * @param {boolean} isBusy 
 */
export const setBusyState = isBusy => ({
	type    : CHANGE_BUSY_STATE,
	payload : isBusy
});

/**
 * Creates Store updating action
 * @param {object} config 
 */
export const updateStore = config => ({
	type : UPDATE_ACTIVE_STORE,
	payload : config
});

/**
 * Creates Filter form state action
 * @param {boolean} isOpened 
 */
export const changeFilterFormState = isOpened => ({
	type : CHANGE_FILTER_STATE,
	payload : isOpened
});

/**
 * Creates Active filter set action
 * @param {string} type 
 */
export const setActiveSort = type => ({
	type : SET_ACTIVE_SORT,
	payload : type
});

/**
 * Creates Delet item action
 * @param {number} id 
 */
export const deleteItem = id => ({
	type : DELETE_ITEM,
	payload : id
});