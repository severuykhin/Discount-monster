import JsonHelper from './JsonHelper';

/**
 * Provides AJAX data requests
 */
class DataProvider {

	/**
	 * Provides GET requests
	 * @param {string} url - Request url 
	 */
	get(url, params = null) {

		if (params && params.hasOwnProperty) {
			url += `?${this._getQueryString(params)}`;
		}

		return new Promise((resolve, reject) => {

			const xhr  = new XMLHttpRequest();
			const json = new JsonHelper();

			xhr.open('GET', url, true);

			xhr.send(null);
			
			xhr.onload = function () {

				if (this.status === 200 && this.statusText === 'OK') {

					const data = json.process(this.responseText);
					resolve(data);
					
				} else {
					reject(this.responseText);
				}
			}

			xhr.onerror = function () {
				reject(this.responseText);
			}

		});

	}

	/**
	 * Provides post request
	 * @param {void} data 
	 * @param {string} url 
	 * @param {boolean} convertData - Automaticly convert data from plain java script object to post data
	 */
	post(data, url, convertData = false) {

		if (convertData) {
			if (typeof data === 'object' && data.hasOwnProperty) {
				data = this._processObjToData(data);
			}
		}

		return new Promise((resolve, reject) => {
			const xhr  = new XMLHttpRequest();
			const json = new JsonHelper();

			xhr.open('POST', url, true);

			xhr.send(data);

			xhr.onload = function () {

				if (this.status === 200 && this.statusText === 'OK') {

					const data = json.process(this.responseText);
					resolve(data);
					
				} else {
					reject(this.responseText);
				}
			}

			xhr.onerror = function () {
				reject(this.responseText);
			}
		});
	}

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
			if (typeof params[key] === 'string' || typeof params[key] === 'number') {
				string += `${key}=${params[key]}`;
			} else if (Array.isArray(params[key])) {
				string += this._getArrayString(key, params[key])
			}
			if (index !== edgeParamIndex) {
				string += '&';
			}	
		});

		// return encodeURIComponent(string);
		return string;
	}

	/**
	 * Converts an array of values to query string array
	 * @param {string} propName 
	 * @param {array} array 
	 */
	_getArrayString (propName, array) {
		let res = '';
		array.forEach( item => {
			res += `&${propName}[]=${item}`
		});

		return res;
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