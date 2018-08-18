import {connect} from 'react-redux';
import React, { Component, Fragment } from 'react';

import Catalog from './Catalog';
import DataProvider from '../../utils/classes/DataProvider';

import { setActive } from '../../ducks/Items';

class CatalogContainer extends Component {

	constructor(props) {
		super(props);

		this.provider = new DataProvider();
	}

	componentDidMount() {
		const params = this.props.match.params;
		this.provider.get('/items', params)
			.then(response => {
				if (response.result === 'ok') {
					this.props.setActive(response.data.items);
				} 
				else {
					alert('При передаче денных произошла ошибка');
				}
			})
			.catch(e => {
				console.log(e);
				alert('При передаче денных произошла ошибка');
			})
	}

	componentDidUpdate(prevProps, preState) {
		
	}

	/**
	 * Get items from server via given query params
	 * @param {object} params - Query params
	 */
	getItems = (params) => {

	}

	render() {
		return (
			<Fragment>
				<Catalog items={this.props.items} />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	items : state.items.get('active').toArray()
});

const mapDispatchToProps = dispatch => ({
	setActive : (items) => dispatch(setActive(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogContainer);