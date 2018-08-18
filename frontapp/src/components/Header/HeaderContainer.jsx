import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import { setStores } from '../../ducks/Store';
import DataProvider from '../../utils/classes/DataProvider';

class HeaderContainer extends Component {

	constructor(props) {
		super(props);

		this.provider = new DataProvider();
	}

	componentDidMount() {
		this.provider.get('/store/all')
			.then( data => {
				this.props.setStores(data.items);
			})
			.catch(e => {
				console.log(e);
				// TO DO - create proper notification class
				alert('При передаче данных проихщшла ошибка.');
			})
	}

	render() {

		const { stores } = this.props;

		return (
			<Fragment>
				<Header items={stores.getAll()} />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	stores : state.store.get('stores')
});

const mapDispatchToProps = dispatch => ({
	setStores : (stores) => dispatch(setStores(stores))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);