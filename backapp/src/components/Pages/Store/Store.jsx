// React stuff
import React from 'react';
import { Route } from 'react-router-dom';

// Custom components
import StoreNav from '../../Store/StoreNav';
import StoreContentContainer from '../../Store/StoreContentContainer';

import './Store.css';

const Store = () => {
	return (
		<div className="app__page-store">

			<div className="stores">
				<div className="stores__nav">
					<StoreNav />
				</div>
				<div className="stores__content">
					<Route path="/backend/store/:id/:page" component={StoreContentContainer} />
				</div>
			</div>
					
		</div>
	);
};

export default Store;