export const moduleName = 'stores';
export const SET_STORES = `${moduleName}/SET_STORES`;
export const ADD_STORE  = `${moduleName}/ADD_STORE`;
export const DELETE_STORE  = `${moduleName}/DELETE_STORE`;

const initialState = {
    collection : []
};

export function storesReducer (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_STORES:
            return {...state, collection : payload};
        case ADD_STORE:
            let newCollection = [...state.collection];
            newCollection.push(payload);
            return {...state, collection : newCollection }
        case DELETE_STORE:
            return {...state, collection : [...state.collection.filter(item => item.id !== payload )]};
        default:
            return state;
    }
}

export const setStores = stores => ({
    type    : SET_STORES,
    payload : stores
});

export const addStore = store => ({
    type    : ADD_STORE,
    payload : store
});

export const deleteStore = id => ({
    type    : DELETE_STORE,
    payload : id
});