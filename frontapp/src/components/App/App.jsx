import React, { Component, Fragment } from 'react';
import { BrowserRouter, 
         Route, 
         Switch} from 'react-router-dom';

import HeaderContainer from '../Header/HeaderContainer';
import CatalogContainer from '../Pages/CatalogContainer';
import Error from '../Pages/Error';

import './App.css';

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
              <Route exact path="/catalog/store/:slug" component={CatalogContainer} />
              <Route exact path="/catalog/:category" component={CatalogContainer} />
              <Route component={Error} />
            </Switch>


          </ Fragment>

        </ BrowserRouter>
      </div>
    );
  }
}

export default App;
