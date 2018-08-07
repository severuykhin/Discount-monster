import DataProvider from '../../utils/classes/DataProvider';


/**
 * Represents TagsForm data providing helper
 */
class TagsFormProvider {

	url = '/backend/tags/create';

	/**
	 * Gets stores as array
	 * @param {string} url 
	 */
	getStoresArray(url) {
		const request = new DataProvider();
		return request.get(url);
	}

	/**
	 * Creates new tag item
	 * @param {object} config - Tag content
	 */
	createItem(config) {

		const request = new DataProvider();
		const data = new FormData();

		for (let key in config) {
			data.append(key, config[key]);
		}

		return request.post(data, this.url);

	}

}

export default TagsFormProvider;