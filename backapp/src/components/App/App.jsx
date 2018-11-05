import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PrimarySearchAppBar from '../Header/Header';
import Menu from '../Menu/Menu';
import Routes from '../Routes/Routes';
import store from '../../redux/index';
import { setStores } from '../../ducks/Stores';
import StoresApi from '../../utils/api/StoresAPI';
import Login from '../Pages/Login';


class App extends Component {

  componentDidMount() {

    // Fetching init app data
    console.log('app mounted');
    const storesApi = new StoresApi();

    Promise.all([
      storesApi.fetchStores()
    ]).then( dataCollection => {
        store.dispatch(setStores(dataCollection[0].data))
    }).catch( (e) => {
      console.log(e);
    }); 

  }

  render() {

    if (false === this.props.user.loggedIn) {
      return <Login />
    }

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

const mapStateToProps = state => ({
  user : state.user
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
