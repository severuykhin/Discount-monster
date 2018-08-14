import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreContent from './StoreContent';
import StoreEditForm from './StoreEditForm';
import StoreFilterForm from './StoreFilterForm';
import StoreContentTitle from './StoreContentTitle';
import Pagination from '../Pagination/Pagination';
import DataProvider from '../../utils/classes/DataProvider';
import { 
		setActiveStore,
		updateStore, 
		setStoreItems, 
		changeEditFormState, 
		changeFilterFormState,
		setBusyState,
		setCount,
		deleteItem,
		setActiveSort } from '../../ducks/Store';

class StoreContentContainer extends Component {

	/**
	 * Collect all query params with sorting and pagination
	 * @returns { object }
	 */
	getQueryParams() {

		let page = this.props.match.params.page ? Number(this.props.match.params.page) : 1;

		const params = {
			id   : Number(this.props.match.params.id),
			page : page,
			step : 50,
			sort : this.props.activeSort
		};

		return params; 
	}

	componentDidMount() {
		let queryParams = this.getQueryParams();
		this.getStoreWithItems(queryParams);
	}

	componentDidUpdate(prevProps, prevState) {
		let queryParams = this.getQueryParams();

		if (
			queryParams.id === Number(prevProps.match.params.id) &&
			queryParams.page !==  Number(prevProps.match.params.page) &&
			prevProps.match.params.page !== undefined
		) {
			this.getStoreWithItems(queryParams);
		}

		else if (queryParams.id !== Number(prevProps.match.params.id)) {
			this.getStoreWithItems(queryParams);
		}

		else if (
			queryParams.id === Number(prevProps.match.params.id) &&
			queryParams.sort !==  prevProps.activeSort
		) {
			this.getStoreWithItems(queryParams);
		}
		
	}

	/**
	 * Parse store
	 * @param {number} id - Store id
	 */
	parseStore = id => {
		const provider = new DataProvider();
		this.props.changeBusyState(true);
		provider.post({id}, '/backend/parser/index', true)
			.then(data => {
				this.props.changeBusyState(false);
				this.props.setStoreItems(data);
			})
			.catch( e => {
				this.props.changeBusyState(false);
				console.log(e)
			})
	}

	/**
	 * Changes Edit form state
	 */
	changeEditFormState = () => {
		let currentEditFormStatus = this.props.editFormOpened;
		this.props.changeEditFormState(!currentEditFormStatus);
	}

	changeFilterFormState = () => {
		let status = this.props.filterFormOpened;
		this.props.changeFilterFormState(!status);
	};

	/**
	 * Get store with containing item by given id
	 * @param {object} params - Store id
	 */
	getStoreWithItems(params) {


		const provider = new DataProvider();
		provider.get(`/backend/store/single/${params.id}`, params)
			.then(data => {
				this.props.setCount(Number(data.count));
				this.props.setActiveStore(data.store);
				this.props.setStoreItems(data.items);
			})
	}

	/**
	 * Updates values for current store
	 * @param {object} config - New values for current store
	 * @param {boolean} sendToServer - Send data to server ans save if true
	 */
	updateCurrentStore = (config, sendToServer = false) => {
		this.props.updateStore(config);

		if (sendToServer) {
			const provider = new DataProvider();
			this.props.changeBusyState(true);
			provider.post(config, `/backend/store/update/${config.id}`, true)
				.then(data => {
					this.props.changeBusyState(false);
				});	
		}
	}

	/**
	 * Apply chiisen filter
	 */
	applyFilter = (e) => {
		let type = e.currentTarget.value;
		this.props.setActiveSort(type);
	}

	/**
	 * Deletes item with given id
	 * @param {number} id - Item id
	 */
	deleteItem = (id) => {
		let allow = window.confirm('Are you sure?');
		if (allow) {
			this.props.deleteItem(id);
			const provider = new DataProvider();
			provider.post({id}, '/backend/item/delete', true)
			.then(data => {
				console.log(data);
			})
			.catch(e => {
				// Handle an error
			})
		}
	}

	render() {

		const { 
				store, 
				items, 
				editFormOpened,
				count, 
				busy } = this.props;

		if (!store) return null;

		return (
			<div>
				<StoreContentTitle
					store={store}
					count={count}
					changeEditFormState={this.changeEditFormState}
					editFormOpened={editFormOpened}/>

				<StoreEditForm
					updateCurrentStore={this.updateCurrentStore}
					active={editFormOpened} 
					store={store}/>

				<StoreContent
					busy={busy}
					store={store}
					items={items}
					parseStore={this.parseStore}
					deleteItem={this.deleteItem} 
					filterOpened={this.props.filterFormOpened}
					changeEditFormState={this.changeEditFormState}
					changeFilterFormState={this.changeFilterFormState}>
					
					<StoreFilterForm 
						applyFilter={this.applyFilter}/>

					<Pagination
						baseLink={`/store/${store.id}`}
						total={count}
						step={50} />

				</StoreContent>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	store            : state.store.get('instance'),
	items            : state.store.get('items').toArray(),
	editFormOpened   : state.store.get('editFormOpened'),
	filterFormOpened : state.store.get('filterFormOpened'),
	busy             : state.store.get('busy'),
	count            : state.store.get('count'),
	activeSort       : state.store.get('activeSort')
});

const mapDispatchToProps = dispatch => ({
	setActiveStore        : (instance) => dispatch(setActiveStore(instance)),
	setCount              : (count)    => dispatch(setCount(count)),
	updateStore           : (config)   => dispatch(updateStore(config)),
	setStoreItems         : (items)    => dispatch(setStoreItems(items)),
	changeEditFormState   : (isOpened) => dispatch(changeEditFormState(isOpened)),
	changeFilterFormState : (isOpened) => dispatch(changeFilterFormState(isOpened)),
	changeBusyState       : (isBusy)   => dispatch(setBusyState(isBusy)),
	setActiveSort         : (type)     => dispatch(setActiveSort(type)),
	deleteItem            : (id)       => dispatch(deleteItem(id)) 
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure : false })(StoreContentContainer);