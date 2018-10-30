/**
 * Provides AJAX data requests
 */
class Request {

	send(type, url, data = null) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(type, url, true);

			xhr.onload = function () {
				if (this.status === 200) {
					resolve(this.responseText);
				} else {
					reject(this.responseText);
				}
			}

			xhr.onerror = function (error) {
				reject(error);
			}

			xhr.send(data);
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
			string += `${key}=${params[key]}`;
			if (index !== edgeParamIndex) {
				string += '&';
			}	
		});

		return string;
	}

}

export default Request;