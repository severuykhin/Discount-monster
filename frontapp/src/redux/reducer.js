import { combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer as router,
		 routerMiddleware } from "react-router-redux";

import storeReducer, {MODULE_NAME as storeModule} from '../ducks/Store';
import itemsReducer, {MODULE_NAME as itemsModule} from '../ducks/Items';


export const history = createHistory();
export const browserRouterMiddleware = routerMiddleware(history);

export default combineReducers({
	router,
	[storeModule] : storeReducer,
	[itemsModule] : itemsReducer
});