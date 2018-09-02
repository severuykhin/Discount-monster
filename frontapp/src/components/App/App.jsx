import React, { Component, Fragment } from 'react';
import { BrowserRouter, 
         Route, Redirect, 
         Switch} from 'react-router-dom';

import { connect } from 'react-redux';

import HeaderContainer from '../Header/HeaderContainer';
import CatalogContainer from '../Pages/CatalogContainer';
import Error from '../Pages/Error';
import Footer from '../Footer/Footer';
import WishlistContainer from '../Wishlist/WishlistContainer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>

          <Fragment>

            
            <HeaderContainer />

            <Switch>
              {/* <Route exact path="/" component={CatalogContainer} /> */}
              <Route exact path="/catalog" component={CatalogContainer} />
              <Route exact path="/catalog/:page" component={CatalogContainer} />
              <Route exact path="/catalog/store/:slug/:page" component={CatalogContainer} />
              <Route exact path="/catalog/store/:slug" component={CatalogContainer} />
              <Redirect from="/" to="/catalog" />
              {/* <Route exact path="/catalog/:category" component={CatalogContainer} /> */}
              <Route component={Error} />
            </Switch>
            
            <ReactCSSTransitionGroup 
                  transitionName="example"
                  transitionAppearTimeout={300}
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}>
                  {this.props.favsOpened && <WishlistContainer />}
            </ ReactCSSTransitionGroup>

            <Footer />

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
