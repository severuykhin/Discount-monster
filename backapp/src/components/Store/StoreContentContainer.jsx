import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreContent from './StoreContent';
import StoreEditForm from './StoreEditForm';
import StoreFilterForm from './StoreFilterForm';
import StoreContentTitle from './StoreContentTitle';
import DataProvider from '../../utils/classes/DataProvider';
import { 
		setActiveStore,
		updateStore, 
		setStoreItems, 
		changeEditFormState, 
		changeFilterFormState,
		setBusyState } from '../../ducks/Store';

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

	applyFilter = (e) => {
		let type = e.currentTarget.value;
		console.log(type);
	}

	render() {

		const { store, items, editFormOpened, busy } = this.props;

		if (!store) return null;

		return (
			<div>
				<StoreContentTitle
					store={store}
					changeEditFormState={this.changeEditFormState}
					editFormOpened={editFormOpened}/>

				<StoreEditForm
					updateCurrentStore={this.updateCurrentStore}
					active={editFormOpened} 
					store={store}/>

				<StoreContent
					parseStore={this.parseStore} 
					changeEditFormState={this.changeEditFormState}
					changeFilterFormState={this.changeFilterFormState}
					items={items}
					busy={busy}
					filterOpened={this.props.filterFormOpened}
					store={store}>
					
					<StoreFilterForm 
						applyFilter={this.applyFilter}/>

				</StoreContent>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	store : state.store.get('instance'),
	items : state.store.get('items').toArray(),
	editFormOpened : state.store.get('editFormOpened'),
	filterFormOpened : state.store.get('filterFormOpened'),
	busy : state.store.get('busy')
});

const mapDispatchToProps = dispatch => ({
	setActiveStore : (instance) => dispatch(setActiveStore(instance)),
	updateStore    : (config)   => dispatch(updateStore(config)),
	setStoreItems  : (items)    => dispatch(setStoreItems(items)),
	changeEditFormState : (isOpened) => dispatch(changeEditFormState(isOpened)),
	changeFilterFormState : (isOpened) => dispatch(changeFilterFormState(isOpened)),
	changeBusyState : (isBusy) => dispatch(setBusyState(isBusy))  
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure : false })(StoreContentContainer);