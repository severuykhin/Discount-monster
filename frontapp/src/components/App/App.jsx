import React, { Component, Fragment } from 'react';
import { BrowserRouter, 
         Route, 
         Switch} from 'react-router-dom';

import Header from '../Header/Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>

          <Fragment>

            
            <Header />


          </ Fragment>

        </ BrowserRouter>
      </div>
    );
  }
}

export default App;
