import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreContent from './StoreContent';
import StoreEditForm from './StoreEditForm';
import StoreFilterForm from './StoreFilterForm';
import StoreContentTitle from './StoreContentTitle';
import Pagination from '../Pagination/Pagination';
import DataProvider from '../../utils/classes/DataProvider';
import Filter from '../../utils/classes/Filter';
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

	componentDidMount() {
		let id = Number(this.props.match.params.id);
		this.getStoreWithItems(id);
	}

	componentDidUpdate(prevProps, prevState) {
		let id = Number(this.props.match.params.id);
		if (id !== Number(prevProps.match.params.id)) {
			this.getStoreWithItems(id);	
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
	 * @param {number} id - Store id
	 */
	getStoreWithItems(id) {

		const provider = new DataProvider();
		provider.get(`/backend/store/single/${id}`)
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

		console.log(this.props);

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

const filter = new Filter();

const mapStateToProps = state => ({
	store            : state.store.get('instance'),
	items            : filter.sortBy(state.store.get('items').toArray(), state.store.activeSort),
	editFormOpened   : state.store.get('editFormOpened'),
	filterFormOpened : state.store.get('filterFormOpened'),
	busy             : state.store.get('busy'),
	count            : state.store.get('count')
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