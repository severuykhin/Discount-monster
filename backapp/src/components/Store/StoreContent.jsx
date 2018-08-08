import React from 'react';
import Item from '../Item/Item';

const StoreContent = (props) => {

	const { 
			store, 
			items, 
			parseStore,
			filterOpened, 
			busy } = props;

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
				<div className="store__items-actions buttons">
					{/* <button
						onClick={() => { parseStore(store.id) }} 
						className={parseButtonState}>
							{isFilled ? 'Спарсить по новой' : 'Спарсить товары'}
					</button> */}
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