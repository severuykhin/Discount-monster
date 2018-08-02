// React stuff
import React from 'react';

// Custom components
import StoreNav from '../../Store/StoreNav';

import './Store.css';

const Store = () => {
	return (
		<div className="app__page-store">

			<div className="stores">
				<div className="stores__nav">
					<StoreNav />
				</div>
				<div className="stores__content">
					Store content
				</div>
			</div>
					
		</div>
	);
};

export default Store;