/**
 * Provides AJAX data requests
 */
class Request {

	constructor() {
		this.type = false;
	}

	as(type) {
		this.type = type;
		return this;
	}

	send(type, url, data = null) {

		const request = this;

		data = this.resolveDataType(data);

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(type, url, true);

			xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_key')}`);
			
			if (this.type) {
				xhr.setRequestHeader('Content-Type', this.type);
			}

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

	resolveDataType(data) {
		if (!data) return null;

		if (this.type === 'application/json' && typeof data === 'object') {
			try {
				data = JSON.stringify(data)
			} catch (e) {
				throw e;
			}

		}
		return data;
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