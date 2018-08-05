import React from 'react';
import Item from '../Item/Item';

const StoreContent = (props) => {

	const { store, items, editFormOpened, parseStore, busy } = props;

	let parseButtonState = busy ? 'button is-info is-loading' : 'button is-info';
		
	let isFilled = items.length > 0;

	const renderItems = items => {
		return items.map( item => {
			return <Item key={item.id} config={item} />
		});
	}

	return (
		<div>
			<br />

			<div className="store__items-area">
				<div className="store__items-actions">
					<button
						onClick={() => { parseStore(store.id) }} 
						className={parseButtonState}>
							{isFilled ? 'Спарсить по новой' : 'Спарсить товары'}
						</button>
				</div>
				<br/>
				<div className="store__items-container columns">
					{ items && renderItems(items) }
				</div>
			</div>
		</div>
	);
};

export default StoreContent;