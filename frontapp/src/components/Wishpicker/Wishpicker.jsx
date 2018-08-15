import React, { Component } from 'react';

class Widhpicker extends Component {
	render() {
		return (
			<div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
				<div className="wishlist d-flex flex-row align-items-center justify-content-end">
					<div className="wishlist_icon"><img src="images/heart.png" alt="" /></div>
					<div className="wishlist_content">
						<div className="wishlist_text"><a href="#">Желания</a></div>
						<div className="wishlist_count">115</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Widhpicker;