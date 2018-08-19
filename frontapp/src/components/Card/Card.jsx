import React from 'react';
import itemsReducer from '../../ducks/Items';
import './Card.css';


const Card = (props) => {

	const { config } = props;

	return (
		<div className="card">
		
			<div className="bestsellers_item discount">
				<div className="bestsellers_item_container">
					<div className="bestsellers_image"><img src={config.img} alt={`Скидки на ${config.title}`} /></div>
					<div className="bestsellers_content">
						<div className="bestsellers_category"><a href="#">Headphones</a></div>
						<div className="bestsellers_name">{config.title}</div>
						<div className="bestsellers_price discount">
							<div>
								<span>{config.price} ₽</span>
							</div>
							{config.price_sale} ₽
						</div>
					</div>
				</div>
				<div className="bestsellers_fav active"><i className="fas fa-heart"></i></div>
				<ul className="bestsellers_marks">
					<li className="bestsellers_mark bestsellers_discount">-25%</li>
					<li className="bestsellers_mark bestsellers_new">new</li>
				</ul>
			</div>
		
		</div>
	);
};

export default Card;