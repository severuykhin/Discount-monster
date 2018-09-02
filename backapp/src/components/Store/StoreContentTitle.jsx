import React from 'react';

const StoreContentTitle = (props) => {

	const { store, editFormOpened, changeEditFormState, count } = props;
	let editButtonClassName = editFormOpened ? 'button is-small store__edit is-info' : 'button is-small store__edit';

	return (
		<div>
			<h1 className="title">
				{store.name} - {count}
				<a 
					onClick={() => { changeEditFormState() }}
					className={editButtonClassName}>
					<span className="icon is-small">
						<i className="fas fa-edit"></i>
					</span>
				</a>
			</h1>

			<h2 className="subtitle">{store.url}</h2>
		</div>
	);
};

export default StoreContentTitle;