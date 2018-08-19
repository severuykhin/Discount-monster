import {connect} from 'react-redux';
import React, { Component, Fragment } from 'react';

import Catalog from './Catalog';
import DataProvider from '../../utils/classes/DataProvider';

import { setActive, setTotal, setBusy } from '../../ducks/Items';

class CatalogContainer extends Component {

	constructor(props) {
		super(props);

		this.provider = new DataProvider();
	}

	componentDidMount() {
		const params = this.props.match.params;
		this.getItems(params);
	}

	componentDidUpdate(prevProps, preState) {
		const params = {};

		let page = this.props.match.params.page,
			slug = this.props.match.params.slug;
		
		let prevPage = prevProps.match.params.page,
			prevSlug = prevProps.match.params.slug;
		
		if (prevPage === page && prevSlug === slug) return;

		if (page) params.page = page;
		if (slug) params.slug = slug;

		this.getItems(params);
	}

	/**
	 * Get items from server via given query params
	 * @param {object} params - Query params
	 */
	getItems = (params) => {

		this.props.setBusy(true);

		this.provider.get('/items', params)
			.then(response => {
				if (response.result === 'ok') {
					this.props.setActive(response.data.items);
					this.props.setTotal(response.data.count);
					this.props.setBusy(false);
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

	render() {

		let paginationLink = this.props.match.params.slug ? `/catalog/store/${this.props.match.params.slug}` : '/catalog'; 

		let currentPage = this.props.match.params.page ? this.props.match.params.page : 0;

		return (
			<Fragment>
				<Catalog 
					currentPage={Number(currentPage)}
					busy={this.props.busy}
					paginationLink={paginationLink}
					items={this.props.items}
					total={this.props.total} />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	items : state.items.get('active').toArray(),
	total : state.items.get('total'),
	busy  : state.items.get('busy')
});

const mapDispatchToProps = dispatch => ({
	setActive : (items)  => dispatch(setActive(items)),
	setTotal  : (num)    => dispatch(setTotal(num)),
	setBusy   : (isBusy) => dispatch(setBusy(isBusy))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogContainer);