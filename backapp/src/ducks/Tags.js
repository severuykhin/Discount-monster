export const moduleName = 'tags';
export const ADD_TAG = `${moduleName}/ADD_TAG`;
export const REMOVE_TAG = `${moduleName}/REMOVE_TAG`;
export const SET_TAGS = `${moduleName}/SET_TAGS`;
export const UPDATE_STORE_BINDINGS = `${moduleName}/UPDATE_STORE_BINDINGS`;

const initialState = {
    collection: []
};

const processTagsToStoreBindings = (state, data) => {

    let collection = state.collection.map(item => {
        console.log(item.id);
        console.log(data.values);
        console.log(data.values.indexOf(item.id));
        if (data.values.indexOf(Number(item.id)) < 0) return;
        item.storesshort = data.values.map(storeId => ({ id: storeId }));
    });

    return {...state, ...collection};
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case ADD_TAG:
            return {...state, collection: [...state.collection, payload]};
        case REMOVE_TAG:
            return {...state, collection: [...state.collection.filter( tag => tag.id !== payload)]};
        case SET_TAGS:
            return {...state, collection: [...payload]}
        case UPDATE_STORE_BINDINGS:
            return processTagsToStoreBindings(state, payload);
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

export const updateTagsToStoreBindings = data => ({
    type: UPDATE_STORE_BINDINGS,
    payload: data
});