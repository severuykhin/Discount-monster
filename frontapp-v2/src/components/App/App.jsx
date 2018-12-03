import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ButtonAccent from '../common/Button/ButtonAccent'
import Routes from '../Routes/Routes'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header/HeaderContainer'
import NavBar from '../NavBar/NavBar'
import AppApi from '../../utils/api/AppApi'

class App extends Component {

  constructor(props) {
    super(props)

    this.api = new AppApi()

  }

  componentDidMount() {
    this.api.getAppData();
  }

  render() {
    return (
      <div id="app" className="app">
        <BrowserRouter>
          <Fragment>
            <Header />
            <NavBar />
            <Routes />
          </Fragment>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({

}); 

export default connect(mapStateToProps, mapDispatchToProps)(App);
