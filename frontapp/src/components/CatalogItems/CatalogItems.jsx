import React from 'react';
import Card from '../Card/Card';

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

	const catalogClass = props.busy ? 'row is-loading' : 'row';

	return (
		<div className={catalogClass}>
			{ buildItems(props.items) }		
		</div>
	);
};

export default CatalogItems;	