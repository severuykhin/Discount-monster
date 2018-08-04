import React from 'react';
import StoreEditForm from './StoreEditForm';

const StoreContent = (props) => {

	const { store, items, editFormOpened, parseStore } = props;

	let editAreaClassName = editFormOpened 	? 'store__edit-area store__edit-area_active' : 'store__edit-area',
		editButtonClassName = editFormOpened ? 'button is-small store__edit is-info' : 'button is-small store__edit';

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
						className="button is-info">
							Спарсить товары
						</button>
				</div>
			</div>
		</div>
	);
};

export default StoreContent;