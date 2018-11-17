export const moduleName = 'links';
export const ADD_LINK = `${moduleName}/ADD_LINK`;
export const REMOVE_LINK = `${moduleName}/REMOVE_LINK`;
export const SET_LINKS = `${moduleName}/SET_LINKS`;
export const UPDATE_LINK = `${moduleName}/UPDATE_LINK`;

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
        case UPDATE_LINK:
            let newCollection = [...state.collection];
            newCollection.forEach((item, index) => {
                if (Number(item.id) === Number(payload.id)) {
                    newCollection[index] = payload;
                }
            });
            return {...state, collection: [...newCollection]}
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

export const updateLink = link => ({
    type: UPDATE_LINK,
    payload: link
});