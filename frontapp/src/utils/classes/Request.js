
/**
 * Represents request class
 * Collects and provides information about the request
 */
class Request {

	/**
	 * Parse and provides params from query string
	 * @param { string } queryString
	 * @return { object } 
	 */
	parseParams(queryString) {

		
		const params = {};
		if (queryString.trim() === '') return params;

		const arr = queryString.substring(1).split('&');
		arr.forEach( i => {
			let pair = i.split('=');
			params[pair[0]] = decodeURIComponent(pair[1]);
		});

		return params;
	}

}

export default Request;