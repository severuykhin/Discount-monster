import JsonHelper from './JsonHelper';

/**
 * Provides AJAX data requests
 */
class DataProvider {

	

	/**
	 * Builds query string "&prop=value" from given object
	 * @param {object} params - Dictionary of query params
	 * @returns {string}
	 */
	_getQueryString(params) {
		let string = '',
			keys = Object.keys(params),
			edgeParamIndex = keys.length - 1;

		keys.forEach((key, index) => {
			string += `${key}=${params[key]}`;
			if (index !== edgeParamIndex) {
				string += '&';
			}	
		});

		return string;
	}

	_processObjToData(obj) {
		let data = new FormData();

		for (let key in obj) {
			data.append(key, obj[key]);
		}

		return data;
	}

}

export default DataProvider;