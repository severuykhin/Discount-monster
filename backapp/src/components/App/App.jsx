import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PrimarySearchAppBar from '../Header/Header';
import Menu from '../Menu/Menu';
import Routes from '../Routes/Routes';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <PrimarySearchAppBar />
          <div className="main">
              <div className="menu">
                  <Menu />
              </div>
              <div className="content">
                  <Routes />
              </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
