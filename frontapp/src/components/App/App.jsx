import React, { Component, Fragment } from 'react';
import { BrowserRouter, 
         Route, 
         Switch} from 'react-router-dom';

import Header from '../Header/Header';
import Catalog from '../Pages/Catalog';
import Error from '../Pages/Error';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>

          <Fragment>

            
            <Header />

            <Switch>
              <Route exact path="/" component={Catalog} />
              <Route exact path="/catalog" component={Catalog} />
              <Route exact path="/catalog/store/:name" component={Catalog} />
              <Route exact path="/catalog/:category" component={Catalog} />
              <Route component={Error} />
            </Switch>


          </ Fragment>

        </ BrowserRouter>
      </div>
    );
  }
}

export default App;
