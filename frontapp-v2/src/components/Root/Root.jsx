import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '../../redux/reducer';
import store from '../../redux/index';
import App from '../App/App';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
      </Provider>
    )
  }
}

export default Root;
