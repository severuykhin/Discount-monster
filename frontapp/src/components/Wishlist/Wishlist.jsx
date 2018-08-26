import React, { Component } from 'react';
import WishlistItem from './WishlistItem';
import './Wishlist.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



class Wishlist extends Component {

	renderItems(items) {
		if (items.length <= 0) return 'Ничего не найдено';

		return items.map( item => {
			return (
					<WishlistItem
						delete={this.props.delete} 
						key={`wishlist-item-${item.id}`} 
						config={item} />)
		});

	}

	render() {
		return (
			<div className="wishlist__modal">
				<div className="wishlist__overlay">
					<div className="wishlist__wrap">
						<button 
							onClick={() => { this.props.close(false) }}
							className="wishlist__close">
							<i className="fas fa-times"></i>
						</button>
						<div className="wishlist__inner">
							<ul className="cart_list">
								{ this.renderItems(this.props.items) }
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Wishlist;