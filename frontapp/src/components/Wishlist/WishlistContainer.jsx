import React, { Component } from 'react';
import Wishlist from './Wishlist';
import { connect } from 'react-redux';
import { setState, setBusy, setFull, deleteFav } from '../../ducks/Favorites';
import DataProvider from '../../utils/classes/DataProvider';
import { DataApi } from '../../utils/classes/DataApi';

class WishlistContainer extends Component {

	constructor(props) {
		super(props);
		this.provider = new DataProvider();
	}

	/**
	 * Close wish list modal table
	 * @param {boolean} state
	 */
	closeWishlist = (state) => {
		this.props.setState(state);
	}

	/**
	 * Delete item by given id
	 * @param {number} id
	 */
	deleteItem = id => {
		this.props.deleteFav(id);
		let favs = DataApi.getAsJson('favorites');
		if (favs === false) return;
		favs.items = favs.items.filter( i => i !== id);
		DataApi.setAsJson(favs, 'favorites');
		return false;
	}

	componentDidMount () {
		if (this.props.ids.length > 0) {
			this.props.setBusy(true);
			this.provider.get('/items/favorites', { items : this.props.ids } )
				.then(response => {
					this.props.setItems(response.data)
					this.props.setBusy(false);
				})
				.catch(e => {
					this.props.setBusy(false);
					alert('Произошла ошибка. Попробуйте еще раз');
					console.log(e);
				})
		}
	}
	
	render() {
		return (
			<React.Fragment>
				<Wishlist 
					items={this.props.items}
					close={this.closeWishlist}
					delete={this.deleteItem}/>
			</React.Fragment>	
		);
	}
}

const mapStateToProps = state => ({
	items : state.favorites.get('fullItems').toArray(),
	ids   : state.favorites.get('items').toArray()
});

const mapDispachToProps = dispatch => ({
	setState  : (state) => dispatch(setState(state)),
	setBusy   : (state) => dispatch(setBusy(state)),
	setItems  : (items) => dispatch(setFull(items)),
	deleteFav : (id)    => dispatch(deleteFav(id))
});

export default connect(mapStateToProps, mapDispachToProps)(WishlistContainer);