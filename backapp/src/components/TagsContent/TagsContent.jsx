import React from 'react';

import './TagsContent.css';

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
				<span	
					key={`tag-item-${item.id}`} 
					className="tag is-light is-medium">
						{item.name}
					<button
						onClick={() => { props.deleteItem(Number(item.id)) }} 
						className="delete is-small"></button>
				</span>
			);
		});
	}

	return (
		<div className="tags__content field is-grouped is-grouped-multiline">
			{ items && generateTagsItems(items) }
		</div>
	);
};

export default TagsContent;