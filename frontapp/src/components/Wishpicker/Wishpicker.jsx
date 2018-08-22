import React, { Component } from 'react';
import { DataApi } from '../../utils/classes/DataApi';


class Widhpicker extends Component {

	constructor(props) {
		super(props);

		this.dataApiName = 'favorites';
	}

	componentDidMount() {

		let favs = DataApi.getAsJson(this.dataApiName);
		console.log(favs);
	}

	render() {
		return (
			<div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
				<div className="wishlist d-flex flex-row align-items-center justify-content-end">
					<div className="wishlist_icon"><img src="images/heart.png" alt="" /></div>
					<div className="wishlist_content">
						<div className="wishlist_text"><a href="#">Закладки</a></div>
						<div className="wishlist_count">0</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Widhpicker;