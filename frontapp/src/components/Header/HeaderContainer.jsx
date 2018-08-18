import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import { setStores } from '../../ducks/Store';

class HeaderContainer extends Component {

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return (
			<Fragment>
				<Header />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	stores : state.store.get('stores')
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);