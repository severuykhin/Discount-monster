import React from 'react';
import StoreEditForm from './StoreEditForm';
import Item from '../Item/Item';

const StoreContent = (props) => {

	const { store, items, editFormOpened, parseStore, busy } = props;

	let editAreaClassName = editFormOpened 	? 'store__edit-area store__edit-area_active' : 'store__edit-area',
		editButtonClassName = editFormOpened ? 'button is-small store__edit is-info' : 'button is-small store__edit',
		parseButtonState = busy ? 'button is-info is-loading' : 'button is-info';
		
	let isFilled = items.length > 0;

	const renderItems = items => {
		return items.map( item => {
			return <Item key={item.id} config={item} />
		});
	}

	return (
		<div>
			<h1 className="title">
				{store.name}
				<a 
					onClick={props.changeEditFormState}
					className={editButtonClassName}>
					<span className="icon is-small">
						<i className="fas fa-edit"></i>
					</span>
				</a>
			</h1>

			<h2 className="subtitle">{store.url}</h2>
			<div className={editAreaClassName}>
				<StoreEditForm config={store} />
			</div>

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