import { Record, List } from 'immutable';

export const MODULE_NAME = 'items';
export const SET_ACTIVE  = `${MODULE_NAME}/SET_ACTIVE`;
export const SET_TOTAL   = `${MODULE_NAME}/SET_TOTAL`;
export const SET_BUSY    = `${MODULE_NAME}/SET_BUSY`;
export const ADD_GENDER  = `${MODULE_NAME}/ADD_GENDER`;
export const DEL_GENDER  = `${MODULE_NAME}/DEL_GENDER`;
export const SET_GENDERS = `${MODULE_NAME}/SET_GENDERS`;

const InitialState = new Record({
	active : new List([]),
	total  : {},
	busy   : false,
	filters : {
		gender : []
	}
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
		case ADD_GENDER:
			let filters = state.get('filters');
			if (filters.gender.indexOf(payload) < 0) {
				filters.gender.push(payload);
			}
			return state.set('filters', {...filters});
		case DEL_GENDER:
			let oldFilters = state.get('filters');
			oldFilters.gender = oldFilters.gender.filter(i => i !== payload);
			return state.set('filters', {...oldFilters});
		case SET_GENDERS:
			let old = state.get('filters');
			old.gender = payload;
			return state.set('filters', {...old});
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
 * @param {object} config - total item count, min and max price 
 */
export const setTotal = config => ({
	type    : SET_TOTAL,
	payload : config
});

/**
 * Dispatch set busy action
 * @param {boolean} isBusy 
 */
export const setBusy = isBusy => ({
	type : SET_BUSY,
	payload : isBusy
});

/**
 * Creates an add gender action
 * @param {string} gender 
 */
export const addGender = gender => ({
	type : ADD_GENDER,
	payload : gender
});

/**
 * Creates an remove gender action
 * @param {string} gender 
 */
export const delGender = gender => ({
	type : DEL_GENDER,
	payload : gender
});

/**
 * Creates an set genders action
 * @param {array} genders 
 */
export const setGenders = genders => ({
	type : SET_GENDERS,
	payload : genders
});