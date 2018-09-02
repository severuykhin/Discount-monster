import { combineReducers } from 'redux';
import createHistory from "history/createBrowserHistory";
import {
	routerReducer as router,
	routerMiddleware
  } from "react-router-redux";
import tagsReducer, { MODULE_NAME as tagsModule } from '../ducks/Tags';
import storesReducer, { MODULE_NAME as storesModule } from '../ducks/Stores';
import storeReducer, { MODULE_NAME as storeModule } from '../ducks/Store';

export const history = createHistory();

export const browserRouterMiddleware = routerMiddleware(history);

export default combineReducers({
	[tagsModule]   : tagsReducer,
	[storesModule] : storesReducer,
	[storeModule]  : storeReducer,
	router,

});