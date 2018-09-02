import React from 'react';
import CardContainer from '../Card/CardContainer';

import './CatalogItems.css';

const CatalogItems = (props) => {

	/**
	 * @param {array} items 
	 * @param {array} favorites
	 */
	const buildItems = (items, favorites) => {
		return items.map( item => {

			const isFavorite = favorites.indexOf(Number(item.id)) > -1;

			return (
				<div key={`catalog-item-${item.id}`} className="col-lg-4 card_wrap">
					<CardContainer 
						config={item} 
						isFavorite={isFavorite} />
				</div>
			);
		});
	};

	const catalogClass = props.busy ? 'row row-catalog is-loading' : 'row row-catalog';

	return (
		<div className={catalogClass}>
			{ buildItems(props.items, props.favorites) }		
		</div>
	);
};

export default CatalogItems;	