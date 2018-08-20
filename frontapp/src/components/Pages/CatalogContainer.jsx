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

	/**
	 * Set price filter
	 * @param { object } values - Min and max price
	 */
	setPriceFilters = (values) => {
		let currentLocation = this.props.history.location.pathname;
		this.props.history.push(`${currentLocation}?${this.provider._getQueryString(values)}`)		
	}

	componentDidMount() {
		const params = this.props.match.params;
		this.getItems(params);
	}

	componentDidUpdate(prevProps, preState) {
		const params = {};

		// console.log('UPDATED', this.props);

		let page = this.props.match.params.page,
			slug = this.props.match.params.slug;
		
		let prevPage = prevProps.match.params.page,
			prevSlug = prevProps.match.params.slug;

		if (page) params.page = page;
		if (slug) params.slug = slug;

		if (this.props.location.search !== prevProps.location.search) {
			this.getItems(params);
			return;
		}

		if (prevPage === page && prevSlug === slug) return;

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
					this.props.setTotal({
						count    : response.data.count,
						minPrice : response.data.minPrice,
						maxPrice : response.data.maxPrice
					});
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
					setPriceFilters={this.setPriceFilters}
					currentPage={Number(currentPage)}
					busy={this.props.busy}
					paginationLink={paginationLink}
					items={this.props.items}
					total={this.props.total.count}
					minPrice={this.props.total.minPrice}
					maxPrice={this.props.total.maxPrice} />
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
	setTotal  : (config)    => dispatch(setTotal(config)),
	setBusy   : (isBusy) => dispatch(setBusy(isBusy))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogContainer);