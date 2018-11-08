import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer, { browserRouterMiddleware } from './reducer';

const store = createStore(reducer, compose(
    applyMiddleware(logger, thunk, browserRouterMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;
