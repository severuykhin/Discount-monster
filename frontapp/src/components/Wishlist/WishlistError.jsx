import React from 'react';

const WishlistItem = (props) => {

	const {id} = props;

	return (
		<li className="cart_item cart_item_error clearfix">
			<div className="cart_item_image">
				<img src="/images/product.svg" alt="Товар не доступен" />
			</div>
			<div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
				<div className="cart_item_name cart_info_col">
					<div className="cart_item_title">Товар более не доступен</div>
				</div>
				<div className="cart_item_quantity cart_info_col">
				</div>
				<div className="cart_item_price cart_info_col">
				</div>
				<div className="cart_item_color cart_info_col">
				</div>
				<div className="cart_item_price cart_info_col">
				</div>
				<div className="cart_item_total cart_info_col">
					<div className="cart_item_title"></div>
					<div className="cart_item_text">
						<button
							onClick={() => { props.delete( Number(id)) }} 
							title="Удалить из закладок" 
							className="wishlist__delete">
							<i className="fas fa-trash-alt"></i>
						</button>
					</div>
				</div>
			</div>
		</li>
	);
};

export default WishlistItem;