import React, { Component } from 'react';
import { Switch,
         Route, 
         BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';

import Index from '../Pages/Index/Index';
import Tags from '../Pages/Tags/Tags';
import Error from '../Pages/Error/Error';
import Store from '../Pages/Store/Store';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>

            <Header />

            <Switch>
              <Route path="/" exact component={Index} />      
              <Route path="/tags" component={Tags} />
              <Route path="/store" exact component={Store} />
              <Route component={Error}  />      
            </Switch>

          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
