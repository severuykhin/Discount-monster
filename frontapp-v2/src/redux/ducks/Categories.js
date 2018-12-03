export const moduleName = 'categories';
export const SET_CATEGORIES = `${moduleName}/SET_CATEGORIES`;

const initialState = {
    name: moduleName,
    collection: []
};

export default function categoriesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_CATEGORIES:
            return {...state, collection: [...payload]}
        default:
            return state;
    }
}

export const setCategories = categories => ({
    type: SET_CATEGORIES,
    payload: categories
});