export const moduleName = 'categories';
export const ADD_CATEGORY = `${moduleName}/ADD_CATEGORY`;
export const REMOVE_CATEGORY = `${moduleName}/REMOVE_CATEGORY`;
export const SET_CATEGORIES = `${moduleName}/SET_CATEGORIES`;

const initialState = {
    collection: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case ADD_CATEGORY:
            return {...state, collection: [...state.collection, payload]};
        case REMOVE_CATEGORY:
            return {...state, collection: [...state.collection.filter( category => category.id !== payload)]};
        case SET_CATEGORIES:
            return {...state, collection: [...payload]}
        default: return state;
    }
}

export const addCategory = category => ({
    type: ADD_CATEGORY,
    payload: category
});

export const removeCategory = id => ({
    type: REMOVE_CATEGORY,
    payload: id
});

export const setCategories = categories => ({
    type: SET_CATEGORIES,
    payload: categories
});