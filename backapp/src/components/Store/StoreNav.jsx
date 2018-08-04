import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataProvider from '../../utils/classes/DataProvider';

import { setStores, deleteStore } from '../../ducks/Stores';

import StoreAddForm from './StoreAddForm';
import { NavLink } from 'react-router-dom';


class StoreNav extends Component {

	url = '/backend/store/index';
	deleteUrl = '/backend/store/delete';


	componentDidMount() {
		const provider = new DataProvider();

		provider.get(this.url)
			.then(data => {
				this.props.setItems(data)
			})
			.catch(e => console.log(e))
	}

	/**
	 * Delete store with given id
	 * @param {number} id
 	 */
	deleteStore = (id) => {
		console.log(id);

		// TO DO - Make proper confirm dialog
		const isAllow = window.confirm('Вы уверены? Удаление магазина удалит все товары');
		
		if (isAllow) {
			const provider = new DataProvider();
			provider.post({ id }, this.deleteUrl, true)
				.then( data => { 
					if (data.result === 'ok') this.props.deleteStore(id);
				})
		}
	}

	/**
	 * Stores entities
	 * @param {array} items 
	 */
	generateItems(items) {

		if (items.length === 0) return 'Магазинов пока нет';
		
		return items.map( item => {
			return (
				<li key={`store-nav-item-${item.id}`}>
					<NavLink 
						key={`store-nav-item-${item.id}-link`}
						to={`/store/${item.id}`}
						activeClassName="is-active">
						{item.name}
					</NavLink>
					<button
						onClick={() => {this.deleteStore(Number(item.id))}} 
						className="delete is-small"></button>
				</li>
			);
		})

	}

	render() {

		const { items } = this.props;

		return (
			<div className="stores__items">
				<aside className="menu">
					<p className="menu-label">
						Магазины
					</p>
					<ul className="menu-list">
						{ this.generateItems(items) }
					</ul>
					<br/>
					<br/>
					<p className="menu-label">
						Добавить
					</p>
					<div>
						<StoreAddForm />
					</div>
					
				</aside>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	items : state.stores.items.toArray()
});

const mapDispatchToProps = (dispatch) => ({
	setItems : (items) => dispatch(setStores(items)),
	deleteStore : (id) => dispatch(deleteStore(id))
});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure : false})(StoreNav);