import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreContent from './StoreContent';
import DataProvider from '../../utils/classes/DataProvider';
import { setActiveStore } from '../../ducks/Store';

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
	 * Get store with containing item by given id
	 * @param {number} id - Store id
	 */
	getStoreWithItems(id) {

		const provider = new DataProvider();
		provider.get(`/backend/store/single/${id}`)
			.then(data => {
				this.props.setActiveStore(data.store);
			})
	}

	render() {

		const { store } = this.props;

		return (
			<div>
				{store && <StoreContent 
							store={store}/>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	store : state.store.get('instance')
});

const mapDispatchToProps = dispatch => ({
	setActiveStore : (instance) => dispatch(setActiveStore(instance))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreContentContainer);