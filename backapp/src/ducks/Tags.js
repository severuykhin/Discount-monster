import { List, Record } from 'immutable';

export const MODULE_NAME       = 'tags';
export const ACTION_ADD_TAG    = `${MODULE_NAME}/ACTION_ADD_TAG`;
export const ACTION_DELETE_TAG = `${MODULE_NAME}/ACTION_DELETE_TAG`;
export const ACTION_GET_TAGS   = `${MODULE_NAME}/ACTION_GET_TAGS`;


const InitialState = new Record({
	busy  : false,
	items : new List(),
});

console.log(InitialState);

export default function reducer (state = new InitialState(), action) {
	const { type, payload } = action;

	switch(type) {
		default:
			return state;
	}
}