import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { addFav, deleteFav } from '../../ducks/Favorites';
import { DataApi } from '../../utils/classes/DataApi';
import  DataProvider from '../../utils/classes/DataProvider';


class CardContainer extends Component {

	/**
	 * Resolve add card to favorite or delete
	 * @param {id} number
	 */
	resolveFavorite = id => {
		if (!this.props.isFavorite) {
			this.props.addFav(id);
			this.addToFavorite(id);
			this.increaseLike(id);
		} else {
			this.props.deleteFav(id);
			this.deleteFromFavorite(id);
		}
	}

	/**
	 * Increases like count 
	 * @param {number} id 
	 */ 
	increaseLike(id) {
		const provider = new DataProvider();
		provider.post(null, `/items/like/${id}`)
			.then(data => {
				console.log(data);
			})
			.catch(e => {
				console.log(e);
				alert('Произошла ошибка. Попробуйте еще раз');
			});
	}

	/**
	 * Adds card to favorite
	 * @param {number} id
	 */
	addToFavorite = id => {
		let favs = DataApi.getAsJson('favorites');
		if (favs === false) {
			favs = {
				items : []
			};
		}

		if (favs.items.indexOf(id) < 0) {
			favs.items.push(id);
		}

		DataApi.setAsJson(favs, 'favorites');
	}	

	/**	
	 * Daletes card from favorite
	 * @param {number} id
	 */
	deleteFromFavorite = id => {
		let favs = DataApi.getAsJson('favorites');
		if (favs === false) return;
		favs.items = favs.items.filter( i => i !== id);
		DataApi.setAsJson(favs, 'favorites');
		return false;
	}

	render() {

		return <Card
					isFavorite={this.props.isFavorite} 
					resolveFavorite={this.resolveFavorite}
					config={this.props.config} />;
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
	addFav : (id) => dispatch(addFav(id)),
	deleteFav : (id) => dispatch(deleteFav(id))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);