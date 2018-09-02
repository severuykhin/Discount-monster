import React, { Component } from 'react';
import WishlistItem from './WishlistItem';
import WishlistError from './WishlistError';
import './Wishlist.css';


class Wishlist extends Component {

	renderItems(items, ids) {

		return ids.map( id => {
			const item = items.filter( i => Number(i.id) === id)[0];
			if (item) {
				return (
					<WishlistItem
						delete={this.props.delete} 
						key={`wishlist-item-${item.id}`} 
						config={item} />)
			} else {
				return <WishlistError
							key={`wishlist-item-${id}`}
							delete={this.props.delete} 
							id={id} />;
			}
		});

	}

	render() {
		return (
			<div className="wishlist__modal">
				<div className="wishlist__overlay">
					<div
						onClick={() => { this.props.close(false) }} 
						className="wishlist__overfake"></div>
					<div className="wishlist__wrap">
						<button 
							onClick={() => { this.props.close(false) }}
							className="wishlist__close">
							<i className="fas fa-times"></i>
						</button>
						<div className="wishlist__inner">
							<ul className="cart_list">
								{ this.renderItems(this.props.items, this.props.ids) }
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Wishlist;