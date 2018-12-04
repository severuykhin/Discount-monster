export const moduleName = 'stores';
export const SET_STORES = `${moduleName}/SET_STORES`;

const initialState = {
    name: moduleName,
    collection: []
};

export default function storesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_STORES:
            return {...state, collection: [...payload]}
        default:
            return state;
    }
}

export const setStores = stores => ({
    type: SET_STORES,
    payload: stores
});