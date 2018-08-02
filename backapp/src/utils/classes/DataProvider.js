import JsonHelper from './JsonHelper';

/**
 * Provides AJAX data requests
 */
class DataProvider {

	/**
	 * Provides GET requests
	 * @param {string} url - Request url 
	 */
	get(url) {

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
	 * Provides POST request
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

	_processObjToData(obj) {
		let data = new FormData();

		for (let key in obj) {
			data.append(key, obj[key]);
		}

		return data;
	}

}

export default DataProvider;