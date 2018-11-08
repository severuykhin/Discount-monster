export const moduleName = 'tags';
export const ADD_TAG = `${moduleName}/ADD_TAG`;
export const REMOVE_TAG = `${moduleName}/REMOVE_TAG`;
export const SET_TAGS = `${moduleName}/SET_TAGS`;

const initialState = {
    collection: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case ADD_TAG:
            return {...state, collection: [...state.collection, payload]};
        case REMOVE_TAG:
            return {...state, collection: [...state.collection.filter( tag => tag.id !== payload)]};
        case SET_TAGS:
            return {...state, collection: [...payload]}
        default: return state;
    }
}

export const addTag = tag => ({
    type: ADD_TAG,
    payload: tag
});

export const removeTag = id => ({
    type: REMOVE_TAG,
    payload: id
});

export const setTags = tags => ({
    type: SET_TAGS,
    payload: tags
});