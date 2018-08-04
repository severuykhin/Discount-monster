import React from 'react';

const StoreContent = (props) => {

	const { store } = props;

	return (
		<div>
			{store.name}		
		</div>
	);
};

export default StoreContent;