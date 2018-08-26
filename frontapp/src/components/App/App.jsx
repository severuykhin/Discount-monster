import React, { Component, Fragment } from 'react';
import { BrowserRouter, 
         Route, 
         Switch} from 'react-router-dom';

import { connect } from 'react-redux';

import HeaderContainer from '../Header/HeaderContainer';
import CatalogContainer from '../Pages/CatalogContainer';
import Error from '../Pages/Error';
import WishlistContainer from '../Wishlist/WishlistContainer';

import './App.css';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>

          <Fragment>

            
            <HeaderContainer />

            <Switch>
              <Route exact path="/" component={CatalogContainer} />
              <Route exact path="/catalog" component={CatalogContainer} />
              <Route exact path="/catalog/:page" component={CatalogContainer} />
              <Route exact path="/catalog/store/:slug/:page" component={CatalogContainer} />
              <Route exact path="/catalog/store/:slug" component={CatalogContainer} />
              {/* <Route exact path="/catalog/:category" component={CatalogContainer} /> */}
              <Route component={Error} />
            </Switch>

            {this.props.favsOpened && <WishlistContainer />}

          </ Fragment>

        </ BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favsOpened : state.favorites.get('opened')  
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
