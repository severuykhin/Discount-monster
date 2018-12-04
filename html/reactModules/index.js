import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import FavoriteWidget from './components/FavoriteWidget/FavoriteWidget.jsx'
import Searchbar from './components/Searchbar/Searchbar.jsx'
import store from './redux/index'

let favoriteWidget = document.getElementById('favorite-widget'),
    searchbarWidget = document.getElementById('searchbar-widget');

if (favoriteWidget) {
    ReactDOM.render(
        <Provider store={store}>
            <FavoriteWidget />
        </Provider>, 
    favoriteWidget);
}

if (searchbarWidget) {
    ReactDOM.render(
        <Provider store={store}>
            <Searchbar />
        </Provider>, 
    searchbarWidget);
}
