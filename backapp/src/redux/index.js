import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer, { browserRouterMiddleware } from './reducer';

import { setStores } from '../ducks/Stores'; 

import StoresApi from '../utils/api/StoresAPI';

const storesApi = new StoresApi();

const store = createStore(reducer, applyMiddleware(logger, thunk, browserRouterMiddleware));
export default store;

// Fetching init app data
Promise.all([
    storesApi.fetchStores()
]).then( dataCollection => {
    store.dispatch(setStores(dataCollection[0].data))
});
