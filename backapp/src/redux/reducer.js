import { combineReducers } from 'redux';
import createHistory from "history/createBrowserHistory";
import {
	routerReducer as router,
	routerMiddleware
	} from "react-router-redux";
	
import { storesReducer, moduleName as storesModule } from '../ducks/Stores';

export const history = createHistory();

export const browserRouterMiddleware = routerMiddleware(history);

export default combineReducers({
	router,
	[storesModule] : storesReducer
});