import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreContent from './StoreContent';
import DataProvider from '../../utils/classes/DataProvider';
import { setActiveStore, setStoreItems, changeEditFormState, setBusyState } from '../../ducks/Store';

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
		});
	}

	/**
	 * Changes Edit form state
	 */
	changeEditFormState = () => {
		let currentEditFormStatus = this.props.editFormOpened;
		this.props.changeEditFormState(!currentEditFormStatus);
	}

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

	render() {

		const { store, items, editFormOpened, busy } = this.props;

		return (
			<div>
				{store && <StoreContent
							parseStore={this.parseStore} 
							editFormOpened={editFormOpened}
							changeEditFormState={this.changeEditFormState}
							items={items}
							busy={busy}
							store={store}/>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	store : state.store.get('instance'),
	items : state.store.get('items').toArray(),
	editFormOpened : state.store.get('editFormOpened'),
	busy : state.store.get('busy')
});

const mapDispatchToProps = dispatch => ({
	setActiveStore : (instance) => dispatch(setActiveStore(instance)),
	setStoreItems  : (items) => dispatch(setStoreItems(items)),
	changeEditFormState : (isOpened) => dispatch(changeEditFormState(isOpened)),
	changeBusyState : (isBusy) => dispatch(setBusyState(isBusy))  
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreContentContainer);