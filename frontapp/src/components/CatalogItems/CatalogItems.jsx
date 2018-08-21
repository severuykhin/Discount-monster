import React from 'react';
import Card from '../Card/Card';

import './CatalogItems.css';

const CatalogItems = (props) => {

	const buildItems = items => {
		return items.map( item => {
			return (
				<div key={`catalog-item-${item.id}`} className="col-lg-4 card_wrap">
					<Card config={item} />
				</div>
			);
		});
	};

	const catalogClass = props.busy ? 'row row-catalog is-loading' : 'row row-catalog';

	return (
		<div className={catalogClass}>
			{ buildItems(props.items) }		
		</div>
	);
};

export default CatalogItems;	