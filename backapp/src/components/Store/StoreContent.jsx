import React from 'react';
import Item from '../Item/Item';

const StoreContent = (props) => {

	const { items,
			deleteItem, 
			filterOpened } = props;

		

	const renderItems = items => {
		return items.map( item => {
			return <Item 
					key={item.id} 
					config={item}
					deleteItem={deleteItem} 
					/>
		});
	}

	return (
		<div>
			<br />

			<div className="store__items-area">
				<div className="store__items-actions buttons">
					<button 
						onClick={() => { props.changeFilterFormState() }}
						className="button">
						<span className="icon is-small">
						<i className="fas fa-filter"></i>
						</span>
					</button>
				</div>
				{filterOpened && props.children}
				<br/>
				<div className="store__items-container columns">
					{ items && renderItems(items) }
				</div>
			</div>
		</div>
	);
};

export default StoreContent;