import React from 'react';
import {config as mainConfig} from '../../utils/config';

const WishlistItem = (props) => {

	const {config} = props;

	return (
		<li className="cart_item clearfix">
			<div className="cart_item_image">
				<img src={ config.img } alt={ config.title } />
			</div>
			<div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
				<div className="cart_item_name cart_info_col">
					<div className="cart_item_title">Название</div>
					<div className="cart_item_text">{ config.title }</div>
				</div>
				<div className="cart_item_quantity cart_info_col">
					<div className="cart_item_title">Цена</div>
					<div className="cart_item_text cart_item_text_price">{ config.price } ₽</div>
				</div>
				<div className="cart_item_price cart_info_col">
					<div className="cart_item_title">Цена со скидкой</div>
					<div className="cart_item_text cart_item_text_price-discount">{ config.price_sale } ₽</div>
				</div>
				<div className="cart_item_color cart_info_col">
					<div className="cart_item_title">Магазин</div>
					<div className="cart_item_text">{ config.store.name }</div>
					<div className="bestsellers_category">{ mainConfig.genders[config.gender].name }</div>
				</div>
				<div className="cart_item_price cart_info_col">
					<div className="cart_item_title">Ссылка</div>
					<div className="cart_item_text">
						<a href={ config.url } target="_blank" className="wishlist__link">
							<i className="fas fa-link"></i>
						</a>
					</div>
				</div>
				<div className="cart_item_total cart_info_col">
					<div className="cart_item_title"></div>
					<div className="cart_item_text">
						<button
							onClick={() => { props.delete( Number(config.id)) }} 
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