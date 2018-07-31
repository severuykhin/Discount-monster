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

			const xhr = new XMLHttpRequest();

			xhr.open('GET', url, true);

			xhr.send(null);

			xhr.onload = function () {

				if (this.status === 200 && this.statusText === 'OK') {
					resolve(this.responseText);
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
	post() {

	}

}

export default DataProvider;