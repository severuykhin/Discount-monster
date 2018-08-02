import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataProvider from '../../utils/classes/DataProvider';

import { setStores } from '../../ducks/Stores';

import StoreAddForm from './StoreAddForm';
import { NavLink } from 'react-router-dom';


class StoreNav extends Component {

	url = '/backend/store/index';

	componentDidMount() {
		const provider = new DataProvider();

		provider.get(this.url)
			.then(data => {
				this.props.setItems(data)
			})
			.catch(e => console.log(e))
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
					<NavLink to={`/store/${item.name}`}>
						{item.name}
					</NavLink>
					<button className="delete is-small"></button>
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
	setItems : (items) => dispatch(setStores(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreNav);