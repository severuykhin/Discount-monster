import React, { Component } from 'react';
import { DataApi } from '../../utils/classes/DataApi';
import { setFavs } from '../../ducks/Favorites';
import { connect } from 'react-redux';
import {} from '../../utils/classes/DataApi';
import { setState } from '../../ducks/Favorites';


class Widhpicker extends Component {

	constructor(props) {
		super(props);

		this.dataApiName = 'favorites';
	}

	componentDidMount() {

		let favs = DataApi.getAsJson(this.dataApiName);

		if (favs) {
			this.props.setFavs(favs.items);
		}
		
	}

	/**
	 * Open favs modal table
	 * @param {boolean} state
	 */
	openFavs = (state) => {
		this.props.setState(state);
	}

	render() {
		return (
			<div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
				<div
					onClick={() => { this.openFavs(true) }} 
					className="wishlist d-flex flex-row align-items-center justify-content-end">
					<div className="wishlist_icon"><img src="/images/heart.png" alt="" /></div>
					<div className="wishlist_content">
						<div className="wishlist_text">Закладки</div>
						<div className="wishlist_count">{ this.props.count }</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	count : state.favorites.get('items').toArray().length
});

const mapDispatchToProps = dispatch => ({
	setFavs  : (favs) => dispatch(setFavs(favs)),
	setState : (isOpened) => dispatch(setState(isOpened))
});

export default connect(mapStateToProps, mapDispatchToProps)(Widhpicker);