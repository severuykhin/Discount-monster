import React from 'react';

const TagsContent = (props) => {

	const { items } = props;

	/**
	 * Generates tags items from given array
	 * @param {array} items - Tags items 
	 */
	function generateTagsItems(items) {

		if (items.length <= 0) return 'Ничего не найдено';

		return items.map( item => {
			return (
				<div key={`tag-item-${item.id}`} > 
					{ item.name } 
				</div>
			);
		});
	}

	return (
		<div className="tags__content">
			{ items && generateTagsItems(items) }
		</div>
	);
};

export default TagsContent;