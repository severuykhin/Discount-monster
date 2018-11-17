export const moduleName = 'links';
export const ADD_LINK = `${moduleName}/ADD_LINK`;
export const REMOVE_LINK = `${moduleName}/REMOVE_LINK`;
export const SET_LINKS = `${moduleName}/SET_LINKS`;

const initialState = {
    collection: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case ADD_LINK:
            return {...state, collection: [...state.collection, payload]};
        case REMOVE_LINK:
            return {...state, collection: [...state.collection.filter( link => link.id !== payload)]};
        case SET_LINKS:
            return {...state, collection: [...payload]}
        default: return state;
    }
}

export const addLink = link => ({
    type: ADD_LINK,
    payload: link
});

export const removeLink = id => ({
    type: REMOVE_LINK,
    payload: id
});

export const setLinks = links => ({
    type: SET_LINKS,
    payload: links
});