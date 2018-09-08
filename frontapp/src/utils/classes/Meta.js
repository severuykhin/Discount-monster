import { metaInfo } from '../meta';

/**
 * Represents class for working with meta information
 */ 
class MetaConstructor {

	constructor(config) {
		this.config = config;
		this.mainTitle = document.querySelector('title');
		this.description = document.querySelector('meta[name="description"]');
	}

	/**
	 * Returns title for the given slug
	 * @param {string} slug
	 * @returns {string} 
	 */
	getStoreTitle(slug) {
		if (!slug) return this.config.stores.default.title;
		if (!this.config.stores[slug]) throw new Error('No such store in metaInfo config');

		return this.config.stores[slug].title;
	}

	/**
	 * Sets meta info to the page
	 * @param {string} slug - Entity slug to search 
	 */
	setMeta(slug) {
		let config = {};

		// Avoid immutable
		if (!slug || !this.config.stores[slug]) config = {...this.config.stores.default}; // If no slug - just set default values
		else config = {...this.config.stores[slug]}; 
		
		this.mainTitle.textContent = config.title;
		this.description.setAttribute('content', config.description);

	}
};

export const Meta = new MetaConstructor(metaInfo);