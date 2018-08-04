import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreContent from './StoreContent';
import DataProvider from '../../utils/classes/DataProvider';
import { setActiveStore, setStoreItems, changeEditFormState } from '../../ducks/Store';

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
		provider.post({id}, '/backend/parser/index', true)
			.then(data => {
				console.log(data);
			})
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

		const { store, items, editFormOpened } = this.props;

		return (
			<div>
				{store && <StoreContent
							parseStore={this.parseStore} 
							editFormOpened={editFormOpened}
							changeEditFormState={this.changeEditFormState}
							items={items}
							store={store}/>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	store : state.store.get('instance'),
	items : state.store.get('items').toArray(),
	editFormOpened : state.store.get('editFormOpened')
});

const mapDispatchToProps = dispatch => ({
	setActiveStore : (instance) => dispatch(setActiveStore(instance)),
	setStoreItems  : (items) => dispatch(setStoreItems(items)),
	changeEditFormState : (isOpened) => dispatch(changeEditFormState(isOpened))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreContentContainer);