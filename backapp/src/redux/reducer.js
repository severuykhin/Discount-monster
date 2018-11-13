import { combineReducers } from 'redux';
import createHistory from "history/createBrowserHistory";
import {
	routerReducer as router,
	routerMiddleware
	} from "react-router-redux";
	
import { storesReducer, moduleName as storesModule } from '../ducks/Stores';
import { userReducer, moduleName as userModule } from '../ducks/User';
import tagsReducer, { moduleName as tagsModule } from '../ducks/Tags';
import categoriesReducer, { moduleName as categoriesModule } from '../ducks/Categories';

export const history = createHistory();

export const browserRouterMiddleware = routerMiddleware(history);

export default combineReducers({
	router,
	[storesModule]: storesReducer,
	[userModule]: userReducer,
	[tagsModule]: tagsReducer,
	[categoriesModule]: categoriesReducer,
});