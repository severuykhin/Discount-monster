import React from 'react';
import { config as mainConfig } from '../../utils/config';
import './Card.css';

const Card = (props) => {

	const { config } = props;
	const favoriteClassName = props.isFavorite ? 'bestsellers_fav bestsellers_fav_active active' : 'bestsellers_fav active'; 

	return (
		<div className="card">
		
			<div className="bestsellers_item discount">
				<div className="bestsellers_item_container">
					<div className="bestsellers_image"><img src={config.img} alt={`Скидки на ${config.title}`} /></div>
					<div className="bestsellers_content">
						<div className="bestsellers_category">{ mainConfig.genders[config.gender].name }</div>
						<div className="bestsellers_name">{config.title}</div>
						<div className="bestsellers_price discount">
							<div>
								<span>{config.price} ₽</span>
							</div>
							{config.price_sale} ₽
						</div>
					</div>
				</div>
				<button 
					className={favoriteClassName}
					onClick={() => { props.resolveFavorite(+config.id) }}>
					<i className="fas fa-heart"></i>
				</button>
				<ul className="bestsellers_marks">
					<li className="bestsellers_mark bestsellers_discount">-25%</li>
					<li className="bestsellers_mark bestsellers_new">new</li>
				</ul>
				<a 
					className="card__away" 
					target="_blank" 
					title="Перейти в магазин" 
					href={config.url}>
					<i className="fas fa-link"></i>
				</a>
			</div>
		
		</div>
	);
};

export default Card;