/**
 * Provides AJAX data requests
 */
class Request {

	send(type, url, data = null) {

		const request = this;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(type, url, true);

			xhr.setRequestHeader('token', localStorage.getItem('auth_key'));

			xhr.onload = function () {
				if (this.status === 200) {
					resolve(this.responseText);
				} else {
					reject(request.formatError(this));
				}
			}

			xhr.onerror = function (error) {
				reject(request.formatError(this));
			}

			xhr.send(data);
		});
	}

	formatError(xhrInstance) {
		return {
			'result': 'error',
			'status': xhrInstance.status,
			'message': xhrInstance.responseText
		}
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