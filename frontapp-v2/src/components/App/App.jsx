import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ButtonAccent from '../common/Button/ButtonAccent'
import Routes from '../Routes/Routes'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header/HeaderContainer'

class App extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div id="app" className="app">
        <BrowserRouter>
          <Fragment>
            <Header />
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
