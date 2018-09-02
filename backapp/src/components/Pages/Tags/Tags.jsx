import React from 'react';

import TagsForm from '../../TagsForm/TagsForm';
import TagsContentContainer from '../../TagsContent/TagsContentContainer';

const Tags = () => {
	return (
		<div className="app__page app__page-sidebar">
			<div className="sidebar">
				<TagsForm />
			</div>
			<div className="app__page-content">
				<TagsContentContainer />
			</div>
		</div>
	);
};

export default Tags;