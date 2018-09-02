import {connect} from 'react-redux';
import React, { Component, Fragment } from 'react';

import Catalog from './Catalog';
import DataProvider from '../../utils/classes/DataProvider';
import Request from '../../utils/classes/Request';

import { setActive, setTotal, setBusy } from '../../ducks/Items';

class CatalogContainer extends Component {

	constructor(props) {
		super(props);

		this.provider = new DataProvider();
		this.request  = new Request();
	}

	/**
	 * Set price filter
	 * @param { object } values
	 */
	setFilters = (values) => {
		const oldParams = this.getRequestParams();
		const newParams = {...oldParams, ...values};

		if (newParams.hasOwnProperty('gender') && newParams.gender.trim() === "") delete newParams.gender;

		let firstPage = this.props.match.params.slug ? `/catalog/store/${this.props.match.params.slug}` : '/catalog' ;
		this.props.history.push(`${firstPage}?${this.provider._getQueryString(newParams)}`);
		
		// Then Component update itself after location change	
		
		return false;
	}

	/**
	 * Parse params from request url via request helper
	 * @returns { string } 
	 */
	getRequestParams = () => {
		return this.request.parseParams(this.props.location.search);
	}

	/**
	 * Provides params from props and query string
	 * @returns { object }
	 */
	getAllParams = () => {
		const params = this.props.match.params;
		const queryParams = this.getRequestParams();

		return {...params, ...queryParams}
	}

	componentDidMount() {
		this.getItems(this.getAllParams());
	}

	componentDidUpdate(prevProps, preState) {
		const params = this.getAllParams();

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
					alert('При передаче данных произошла ошибка');
				}
			})
			.catch(e => {
				console.log(e);
				alert('При передаче данных произошла ошибка');
			})
	}

	render() {
		let paginationLink = this.props.match.params.slug ? `/catalog/store/${this.props.match.params.slug}` : '/catalog'; 
		let currentPage = this.props.match.params.page ? this.props.match.params.page : 0;
		let params = this.getAllParams();

		return (
			<Fragment>
				<Catalog 
					setFilters={this.setFilters}
					currentPage={Number(currentPage)}
					busy={this.props.busy}
					queryParams={this.props.location.search}
					paginationLink={paginationLink}
					items={this.props.items}
					favorites={this.props.favs}
					total={this.props.total.count}
					minPrice={this.props.total.minPrice}
					maxPrice={this.props.total.maxPrice}
					startPrice={params.min || this.props.total.minPrice}
					endPrice={params.max || this.props.total.maxPrice}
					activeSort={params.sort}
					activeGender={params.gender || null}
					currentStore={this.props.match.params.slug || ''} />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	items : state.items.get('active').toArray(),
	total : state.items.get('total'),
	busy  : state.items.get('busy'),
	favs  : state.favorites.get('items').toArray()
});

const mapDispatchToProps = dispatch => ({
	setActive : (items)  => dispatch(setActive(items)),
	setTotal  : (config)    => dispatch(setTotal(config)),
	setBusy   : (isBusy) => dispatch(setBusy(isBusy))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogContainer);